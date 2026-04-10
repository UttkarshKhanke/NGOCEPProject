const mongoose = require("mongoose");

const ourworkSchema = new mongoose.Schema({
  title: String,
  image: String,
  amount: Number,
  type: {
    type: String,
    enum: ["completed", "ongoing"],
    default: "ongoing"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("OurWork", ourworkSchema);