// models/communication.model.js
import mongoose from "mongoose";

const communicationSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    content: { type: String, required: true }, // Renamed from notes to content
    type: { type: String },  // Optional communication type ('email', 'call', etc.)
    date: { type: Date, default: Date.now },
    followUp: { type: String },
    isFollowUpPending: { type: Boolean, default: true }
  });
  

const Communication = mongoose.model('Communication', communicationSchema);

export default Communication;
