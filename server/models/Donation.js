const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  amount: Number,
  upiTransactionId: { 
    type: String,
    required: true,
    unique: true
  },
  
  type: { type: String, default: "money" },

  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Donation", donationSchema);