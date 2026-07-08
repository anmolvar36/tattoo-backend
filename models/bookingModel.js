import db from '../config/db.js';

class BookingModel {
  static async checkSlotOverlap(stationId, bookingDate, startHour, endHour) {
    const [rows] = await db.execute(
      `SELECT id FROM bookings 
       WHERE station_id = ? 
       AND booking_date = ? 
       AND status != 'Cancelled'
       AND (
         (start_hour < ? AND end_hour > ?) OR
         (start_hour >= ? AND start_hour < ?)
       )`,
      [stationId, bookingDate, endHour, startHour, startHour, endHour]
    );
    return rows.length > 0;
  }

  static async create(bookingData) {
    const { userId, stationId, bookingDate, startHour, endHour, totalPrice, location, status } = bookingData;
    const [result] = await db.execute(
      `INSERT INTO bookings (user_id, station_id, booking_date, start_hour, end_hour, total_price, location, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, stationId, bookingDate, startHour, endHour, totalPrice, location, status]
    );
    return result.insertId;
  }

  static async getByUserId(userId) {
    const [rows] = await db.execute(
      `SELECT * FROM bookings WHERE user_id = ? ORDER BY booking_date DESC, start_hour ASC`,
      [userId]
    );
    return rows;
  }

  static async getAll(location) {
    let query = `
      SELECT b.*, u.name as user_name, u.email as user_email, s.name as station_name 
      FROM bookings b 
      LEFT JOIN users u ON b.user_id = u.id
      LEFT JOIN stations s ON b.station_id = s.id
    `;
    const params = [];
    
    if (location) {
      query += ` WHERE b.location = ?`;
      params.push(location);
    }
    
    query += ` ORDER BY b.booking_date DESC, b.start_hour ASC`;
    
    const [rows] = await db.execute(query, params);
    return rows;
  }

  static async updateStatus(id, status) {
    const [result] = await db.execute(
      `UPDATE bookings SET status = ? WHERE id = ?`,
      [status, id]
    );
    return result.affectedRows > 0;
  }
}

export default BookingModel;
