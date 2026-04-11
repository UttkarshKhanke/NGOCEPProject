const mongoose = require("mongoose");

const dropOffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  condition: { type: String, required: true },
  datetime: { type: Date, required: true },
  status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Dropoff", dropOffSchema);