import express from 'express';
import Customer from '../models/Customer.js'; // Import customer model

const router = express.Router();

// Create a new customer
router.post('/customers', async (req, res) => {
    const { name, email, phone, address, purchaseHistory, preferences, followUp } = req.body;
  
    try {
      const newCustomer = new Customer({
        name,
        email,
        phone,
        address,
        purchaseHistory: purchaseHistory || [], // Ensure arrays are provided
        preferences: preferences || { fabricType: [], colors: [], designs: [] },
        followUp: followUp || [] // Default to empty if not provided
      });
  
      console.log('New Customer Payload:', newCustomer); // Log the customer data before saving
      await newCustomer.save();
      console.log('Customer created:', newCustomer); // Log success
      return res.status(201).json(newCustomer);
    } catch (error) {
      console.error('Error creating customer:', error); // Log the error
      return res.status(500).json({ error: "Error creating customer." });
    }
  });
  


// Get all customers
router.get('/customers', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving customers', error });
    }
});

// Get a single customer by ID
router.get('/customers/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving customer', error });
    }
});

// Update a customer by ID
router.put('/customers/:id', async (req, res) => {
    const { name, email, phone, address, purchaseHistory, preferences, followUp } = req.body;

    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, {
            name,
            email,
            phone,
            address,
            purchaseHistory: purchaseHistory || [],
            preferences: preferences || {},
            followUp: followUp || []
        }, { new: true }); // Return the updated document

        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json(updatedCustomer);
    } catch (error) {
        console.error('Error updating customer:', error);
        return res.status(500).json({ error: "Error updating customer." });
    }
});



// Delete a customer by ID
router.delete('/customers/:id', async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id); // Finds and deletes the customer by ID
        
        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' }); // If customer doesn't exist, return a 404 error
        }
        
        res.status(200).json({ message: 'Customer deleted successfully' }); // If successful, return a success message
    } catch (error) {
        res.status(500).json({ message: 'Error deleting customer', error }); // If an error occurs, return a 500 status
    }
});



export default router;
