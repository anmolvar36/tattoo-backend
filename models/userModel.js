import db from '../config/db.js';

class UserModel {
  // Find a user by their email address
  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  // Create a new artist account
  static async createArtist(artistData) {
    const { name, email, passwordHash, phone, instagram } = artistData;
    const [result] = await db.execute(
      `INSERT INTO users (name, email, password_hash, role, phone, instagram, status) 
       VALUES (?, ?, ?, 'artist', ?, ?, 'Active')`,
      [name, email, passwordHash, phone, instagram]
    );
    return result.insertId;
  }
}

export default UserModel;
