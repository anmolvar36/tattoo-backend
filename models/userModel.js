import db from '../config/db.js';

// User Model for MySQL Operations
export const UserModel = {
  // Find user by email
  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE LOWER(email) = LOWER(?)', [email]);
    return rows[0] || null;
  },

  // Find user by ID
  findById: async (id) => {
    const [rows] = await db.query('SELECT id, name, email, role, phone, instagram, status, created_at FROM users WHERE id = ?', [id]);
    return rows[0] || null;
  },

  // Create new artist user
  createArtist: async ({ name, email, passwordHash, phone, instagram }) => {
    const [result] = await db.query(
      'INSERT INTO users (name, email, password_hash, role, phone, instagram, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, passwordHash, 'artist', phone || null, instagram || null, 'Active']
    );
    return result.insertId;
  },

  // Fetch all users (Admin view)
  getAllUsers: async () => {
    const [rows] = await db.query('SELECT id, name, email, role, phone, instagram, status, created_at FROM users ORDER BY created_at DESC');
    return rows;
  }
};

export default UserModel;
