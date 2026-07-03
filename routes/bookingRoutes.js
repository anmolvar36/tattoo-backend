import express from 'express';
import { 
  getAvailability, 
  createBooking, 
  getMyBookings, 
  getAdminBookings, 
  cancelBooking, 
  blockStationSlot 
} from '../controllers/bookingController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public route for availability query
router.get('/availability', getAvailability);

// Protected artist routes
router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.patch('/:id/cancel', protect, cancelBooking);

// Admin protected routes
router.get('/admin/all', protect, adminOnly, getAdminBookings);
router.post('/admin/block', protect, adminOnly, blockStationSlot);

export default router;
