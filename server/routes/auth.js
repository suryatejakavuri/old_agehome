import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';

const router = Router();

/* ================= REGISTER ================= */
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("REGISTER VALIDATION ERROR:", errors.array());
        return res.status(400).json({ message: errors.array()[0].msg });
      }

      const { name, email, password, role } = req.body;

      console.log("REGISTER DATA:", req.body);

      // Check existing user
      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash password
      const hash = await bcrypt.hash(password, 10);

      // Create user
      const user = await User.create({
        name,
        email,
        password: hash,
        role: role || 'donor'
      });

      // Generate token
      const token = jwt.sign(
        { id: user._id, role: user.role, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({ token });

    } catch (err) {
      console.error("REGISTER ERROR:", err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

/* ================= LOGIN ================= */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN DATA:", req.body);

    // Check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token });

  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;