import db from '../config/db.js';

class InquiryModel {
  static async create(inquiryData) {
    const { name, email, message, submittedDate } = inquiryData;
    const [result] = await db.execute(
      `INSERT INTO inquiries (name, email, message, submitted_date) VALUES (?, ?, ?, ?)`,
      [name, email, message, submittedDate]
    );
    return result.insertId;
  }

  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM inquiries ORDER BY created_at DESC');
    return rows;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM inquiries WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

export default InquiryModel;
