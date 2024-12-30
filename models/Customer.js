import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  preferences: {
    fabricType: { type: [String], default: [] }, // Array of strings
    colors: { type: [String], default: [] },     // Array of strings
    designs: { type: [String], default: [] }     // Array of strings
  },
  purchaseHistory: [{
    product: { type: String },
    quantity: { type: Number },
    purchaseDate: { type: Date, default: Date.now }  // Defaults to current date if not provided
  }],
  followUp: [{
    date: { type: Date, default: Date.now },        // Defaults to current date if not provided
    action: { type: String },
    notes: { type: String }
  }]
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
