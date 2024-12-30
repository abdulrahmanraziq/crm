import express from 'express';
import Communication from '../models/communication.model.js';
import Customer from '../models/Customer.js';

const router = express.Router();

// Get all communications for a customer
router.get('/:customerId/communications', async (req, res) => {
  try {
    // Fetch all communications for the given customerId
    const communications = await Communication.find({ customerId: req.params.customerId });
    
    // Return the fetched communications as JSON
    res.json(communications);
  } catch (error) {
    console.error('Error fetching communications:', error);
    res.status(500).json({ message: 'Error fetching communications' });
  }
});

// Add a new communication for a customer
router.post('/:customerId/communications', async (req, res) => {
  const { content } = req.body;  // Get communication content from the request body
  
  // Validate if content exists
  if (!content) {
    return res.status(400).json({ message: 'Communication content is required' });
  }

  try {
    // Create a new communication record
    const newComm = new Communication({
      customerId: req.params.customerId,  // Assign the customerId from the URL parameter
      content,  // Use content as communication notes
      date: new Date(),  // Set the current date
    });

    // Save the new communication record to the database
    const savedComm = await newComm.save();
    
    // Return the newly saved communication as JSON
    res.json(savedComm);
  } catch (error) {
    console.error('Error adding communication:', error);
    res.status(500).json({ message: 'Error adding communication' });
  }
});

export default router;
