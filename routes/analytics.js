import express from 'express';
import Customer from '../models/Customer.js';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// Customer Analytics
router.get('/analytics/customers', async (req, res) => {
  try {
    // Total number of customers
    const totalCustomers = await Customer.countDocuments();

    // Aggregate popular preferences (fabricType, colors, designs)
    const popularPreferences = await Customer.aggregate([
      { $unwind: '$preferences.fabricType' },
      {
        $group: {
          _id: '$preferences.fabricType',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Purchase history trends
    const purchaseTrends = await Customer.aggregate([
      { $unwind: '$purchaseHistory' },
      {
        $group: {
          _id: { month: { $month: '$purchaseHistory.purchaseDate' }, year: { $year: '$purchaseHistory.purchaseDate' } },
          totalPurchases: { $sum: '$purchaseHistory.quantity' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } } // Sort by most recent
    ]);

    res.json({
      totalCustomers,
      popularPreferences,
      purchaseTrends
    });
  } catch (error) {
    console.error('Error fetching customer analytics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Feedback Analytics
router.get('/analytics/feedback', async (req, res) => {
  try {
    // Total feedback count
    const totalFeedback = await Feedback.countDocuments();

    // Feedback submission trends over time
    const feedbackTrends = await Feedback.aggregate([
      {
        $group: {
          _id: { month: { $month: '$date' }, year: { $year: '$date' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } } // Sort by most recent
    ]);

    res.json({
      totalFeedback,
      feedbackTrends
    });
  } catch (error) {
    console.error('Error fetching feedback analytics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
