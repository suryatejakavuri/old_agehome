import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config.db.js';

import authRoutes from './routes/auth.js';
import residentRoutes from './routes/residents.js';
import donationRoutes from './routes/donations.js';
import eventRoutes from './routes/events.js';
import storyRoutes from './routes/stories.js';
import uploadRoutes from './routes/uploads.js';

const app = express();
const server = http.createServer(app);

// Debug (REMOVE later)
console.log("MONGO_URI:", process.env.MONGO_URI);

// Connect DB
connectDB(process.env.MONGO_URI);

// Socket
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || '*',
  credentials: true
}));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

// Routes
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'OldAgeHome API running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/residents', residentRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/uploads', uploadRoutes);

// Socket events
io.on('connection', (socket) => {
  console.log("User connected");

  socket.on('message', (msg) => {
    io.emit('message', {
      text: (msg.text || '').slice(0, 500),
      from: msg.from || 'guest',
      ts: Date.now()
    });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});