import express from 'express';
import morgan from 'morgan';
import connctDB from './confiq/db.js'; // Ensure the db.js file is correctly spelled
import router from './routes/auth.js';
import cors from 'cors';
import auth from './middlewares/auth.js';
import customerRoutes from './routes/customerRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import analyticsRoutes from './routes/analytics.js';
import communicationRoutes from './routes/communication.routes.js';
import dotenv from 'dotenv';

// Initialize app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

// Load environment variable
dotenv.config();

// Routes
app.use('/api', router);
app.use('/api', customerRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api', analyticsRoutes);
app.use('/api/customers', communicationRoutes);

// Example protected route
app.get('/protected', auth, (req, res) => {
  return res.status(200).json({ ...req.user._doc });
});

// Basic root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Server config
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, async () => {
  try {
    await connctDB(); // Make sure this function is correctly implemented
    console.log(`Server is running on port: ${PORT}`);
  } catch (err) {
    console.error('Failed to connect to the database', err);
  }
});
