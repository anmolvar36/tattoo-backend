import BookingModel from '../models/bookingModel.js';
import db from '../config/db.js';

// @desc    Calculate free spots per day for chosen session duration
// @route   GET /api/bookings/availability
// @access  Public
export const getAvailability = async (req, res) => {
  try {
    const { date, duration = 3 } = req.query;
    if (!date) {
      return res.status(400).json({ message: 'Date parameter is required' });
    }

    const durationNum = parseInt(duration);
    const openingHour = 10;
    const closingHour = 18;
    const maxClosing = Math.max(closingHour, openingHour + durationNum);
    const stationsCount = 4;

    // Fetch all active bookings for this date
    const [activeBookings] = await db.query(
      `SELECT station_id, start_hour, end_hour FROM bookings WHERE booking_date = ? AND status != 'Cancelled'`,
      [date]
    );

    let totalAvailableSpots = 0;

    for (let s = 1; s <= stationsCount; s++) {
      let isStationAvailable = false;
      for (let start = openingHour; start <= maxClosing - durationNum; start++) {
        const end = start + durationNum;
        const hasOverlap = activeBookings.some(b =>
          Number(b.station_id) === s &&
          ((start >= Number(b.start_hour) && start < Number(b.end_hour)) ||
           (end > Number(b.start_hour) && end <= Number(b.end_hour)) ||
           (start <= Number(b.start_hour) && end >= Number(b.end_hour)))
        );
        if (!hasOverlap) {
          isStationAvailable = true;
          break;
        }
      }
      if (isStationAvailable) totalAvailableSpots++;
    }

    res.json({ date, duration: durationNum, availableSpots: totalAvailableSpots });
  } catch (error) {
    console.error('Availability Calculation Error:', error);
    res.status(500).json({ message: 'Error checking availability', error: error.message });
  }
};

// @desc    Create new station booking reservation
// @route   POST /api/bookings
// @access  Private (Artist)
export const createBooking = async (req, res) => {
  try {
    const { stationId, bookingDate, startHour, endHour, totalPrice, location = 'Zurich' } = req.body;
    const userId = req.user.id;

    if (!stationId || !bookingDate || startHour === undefined || endHour === undefined || !totalPrice) {
      return res.status(400).json({ message: 'Please provide all required booking details' });
    }

    // Check overlap
    const isOverlap = await BookingModel.checkSlotOverlap(stationId, bookingDate, startHour, endHour);
    if (isOverlap) {
      return res.status(400).json({ message: `Station ${stationId} is already reserved for this time slot.` });
    }

    const bookingId = await BookingModel.create({
      userId,
      stationId,
      bookingDate,
      startHour,
      endHour,
      totalPrice,
      location,
      status: 'Confirmed'
    });

    res.status(201).json({
      message: 'Station reservation confirmed successfully',
      bookingId,
      details: { id: bookingId, userId, stationId, bookingDate, startHour, endHour, totalPrice, status: 'Confirmed' }
    });
  } catch (error) {
    console.error('Booking Creation Error:', error);
    res.status(500).json({ message: 'Error processing booking reservation' });
  }
};

// @desc    Get logged in artist's personal bookings
// @route   GET /api/bookings/my-bookings
// @access  Private (Artist)
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.getByUserId(req.user.id);
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching personal bookings' });
  }
};

// @desc    Get master bookings log (Admin view)
// @route   GET /api/bookings/admin/all
// @access  Private (Admin)
export const getAdminBookings = async (req, res) => {
  try {
    const { location } = req.query;
    const bookings = await BookingModel.getAll(location);
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching master admin bookings log' });
  }
};

// @desc    Cancel a booking
// @route   PATCH /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await BookingModel.updateStatus(id, 'Cancelled');
    if (!success) {
      return res.status(404).json({ message: 'Booking reservation not found' });
    }
    res.json({ message: 'Booking reservation cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking reservation' });
  }
};

// @desc    Block out station slot for studio maintenance (Admin)
// @route   POST /api/bookings/admin/block
// @access  Private (Admin)
export const blockStationSlot = async (req, res) => {
  try {
    const { stationId, bookingDate, startHour, endHour, location = 'Zurich' } = req.body;
    const blockId = await BookingModel.create({
      userId: null,
      stationId,
      bookingDate,
      startHour,
      endHour,
      totalPrice: 0,
      location,
      status: 'Blocked'
    });
    res.status(201).json({ message: 'Station slot blocked out successfully', blockId });
  } catch (error) {
    res.status(500).json({ message: 'Error blocking workstation slot' });
  }
};
