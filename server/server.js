const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/ourwork", require("./routes/ourworkRoutes"));
app.use("/api/donations", require("./routes/donationRoutes"));
app.use("/api/dropoff", require("./routes/dropoffRoutes"));
app.use("/api/porterservice", require("./routes/porterserviceRoutes"));

// env port or fallback
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));