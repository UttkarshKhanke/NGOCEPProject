const mongoose = require("mongoose");

const porterserviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  condition: { type: String, required: true },
  datetime: { type: Date, required: true },
  status: { 
  type: String, 
  enum: ["pending", "porterbooked", "completed"],
  default: "pending"
},
  location:{ type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("PorterService", porterserviceSchema);