import express from 'express';
import Feedback from '../models/Feedback.js';



const router = express.Router();

// POST request to handle feedback submission
router.post('/', async (req, res) => {
  const { name, email, feedback } = req.body;

  try {
    const newFeedback = new Feedback({
      name,
      email,
      feedback,
    });

    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving feedback' });
  }
});

export default router;
