import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import db, { checkDbConnection } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import managerSettingsRoutes from './routes/managerSettingsRoutes.js';
import printfulRoutes from './routes/printful.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Seed Default Admin & Artist Accounts helper
const seedDefaultUsers = async () => {
  try {
    // 1. Seed Admin
    const [adminRows] = await db.query('SELECT * FROM users WHERE role = "admin" LIMIT 1');
    if (adminRows.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('admin123', salt);
      await db.query(
        'INSERT INTO users (name, email, password_hash, role, status, phone, instagram) VALUES (?, ?, ?, ?, ?, ?, ?)',
        ['Chris (Studio Manager)', 'chris@tattooplatz.ch', passwordHash, 'admin', 'Active', '+41 44 123 45 67', '@tattooplatz_zurich']
      );
      console.log('👑 Default Studio Admin created: chris@tattooplatz.ch / admin123');
    } else {
      // Ensure existing admin has phone and instagram populated
      await db.query(
        'UPDATE users SET phone = ?, instagram = ? WHERE email = ? AND (phone IS NULL OR instagram IS NULL)',
        ['+41 44 123 45 67', '@tattooplatz_zurich', 'chris@tattooplatz.ch']
      );
    }


    // 2. Seed Default Artists
    const defaultArtists = [
      { name: 'Joao Otereze', email: 'artist@tattooplatz.ch', pass: 'artist123', phone: '+41 79 123 45 67', ig: '@artist_instagram' },
      { name: 'Marco V.', email: 'marco.v@gmail.com', pass: 'marco2026', phone: '+41 78 234 56 78', ig: '@marco_tats' },
      { name: 'Alina R.', email: 'alina.r@gmail.com', pass: 'alina2026', phone: '+41 77 345 67 89', ig: '@alina_ink' },
      { name: 'Jonas K.', email: 'jonas.k@tattooplatz.ch', pass: 'jonas2026', phone: '+41 76 456 78 90', ig: '@jonas_tattoos' },
      { name: 'Sofia M.', email: 'sofia.m@gmail.com', pass: 'sofia2026', phone: '+41 75 567 89 01', ig: '@sofia_tattoos' }
    ];

    for (const artist of defaultArtists) {
      const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [artist.email]);
      if (existing.length === 0) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(artist.pass, salt);
        await db.query(
          'INSERT INTO users (name, email, password_hash, role, status, phone, instagram) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [artist.name, artist.email, passwordHash, 'artist', 'Active', artist.phone, artist.ig]
        );

        console.log(`🎨 Default Artist seeded into MySQL DB: ${artist.email}`);
      }
    }
  } catch (error) {
    console.error('User Seed Error:', error.message);
  }
};

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/manager/settings', managerSettingsRoutes);
app.use('/api/printful', printfulRoutes);

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Tattooplatz Backend API is running successfully!' });
});

// Start Server
app.listen(PORT, async () => {
  console.log(`🚀 Tattooplatz Server running on port ${PORT}`);
  await checkDbConnection();
  await seedDefaultUsers();
});

