import React, { useState } from "react";
import axios from "axios";
import '../styles.css'; 

function Donate() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    amount: "",
    upiTransactionId: "",
    status: "pending"
  });

  // Drop-off form state
  const [dropoff, setDropoff] = useState({
  name: "",
  phone: "",
  category: "",
  description: "",
  condition: "",
  datetime: "",
  status: "pending"
});

  // porter service
  const [porter, setPorter] = useState({
    name: "",
    phone: "",
    category: "",
    description: "",
    condition: "",
    datetime: "",
    location: "",
    status: "pending"
  });

  // Donation form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm("Are all details correct?");
    if (!isConfirmed) return;

    try {
      await axios.post("http://localhost:5000/api/donations", form);
      alert("Donation Submitted!");
      setForm({ name: "", phone: "", email: "", amount: "", upiTransactionId: "" });
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("Failed to submit donation.");
    }
  };

  // Drop-off form submission
  const handleSubmitDropoff = async (e) => {
  e.preventDefault();

  try {
    await axios.post("http://localhost:5000/api/dropoff", dropoff);
    alert("Drop-off scheduled!");
    setDropoff({
      name: "",
      phone: "",
      category: "",
      description: "",
      condition: "",
      datetime: "",
      status: "pending"
    });
  } catch (error) {
    console.error("Failed to schedule drop-off:", error);
    alert("Failed to schedule drop-off.");
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  // porter service request
  const handleSubmitPorter = async (e) => {
  e.preventDefault();

  const isConfirmed = window.confirm("Confirm porter service request?");
  if (!isConfirmed) return;

  try {
    await axios.post("http://localhost:5000/api/porterservice", porter);

    alert("Porter service requested successfully!");

    setPorter({
      name: "",
      phone: "",
      category: "",
      description: "",
      condition: "",
      datetime: "",
      location: "",
      status: "pending"
    });

  } catch (error) {
    console.error("Error requesting porter service:", error);
    alert("Failed to request porter service.");
  }
};

  return (
    <div className="donate-page">

      {/* MONEY DONATION */}
      <section className="donate-section">
        <h1>Donate Money</h1>
        <div className="donate-container">
          {/* FORM */}
          <form className="donate-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              value={form.phone}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount (₹)"
              required
              value={form.amount}
              onChange={handleChange}
            />
            <input
              type="text"
              name="upiTransactionId"
              placeholder="UPI Transaction ID"
              required
              value={form.upiTransactionId}
              onChange={handleChange}
            />
            <button type="submit">Submit Donation</button>
          </form>

          {/* QR + UPI */}
          <div className="payment-info">
            <h3>Scan & Pay</h3>
            <img
            // UPI ID enter HERE
            // abc@okicici
            //pay?pa=abc@okicici&pn=Atmadeepum%20Society&cu=INR
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=abc@okicici&pn=Atmadeepum%20Society&cu=INR"
              alt="QR Code"
            />
            <p><strong>UPI ID:</strong> abc@okicici</p>
          </div>
        </div>
      </section>

      {/* ITEM DONATION */}
      < section className="donate-section">
      <h1>Donate Items</h1>

      <div className="donate-container">
        <form className="donate-form" onSubmit={handleSubmitDropoff}>
          <h3>Drop-off</h3>

          <input
            type="text"
            placeholder="Your Name"
            value={dropoff.name}
            onChange={(e) => setDropoff({ ...dropoff, name: e.target.value })}
            required
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            value={dropoff.phone}
            onChange={(e) => setDropoff({ ...dropoff, phone: e.target.value })}
            required
          />

          <select
            value={dropoff.category}
            onChange={(e) => setDropoff({ ...dropoff, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            <option>Clothing</option>
            <option>Assistive Devices</option>
            <option>Electronics</option>
            <option>Books & Braille</option>
            <option>Food & Nutrition</option>
            <option>Furniture</option>
            <option>Sports & Recreation</option>
            <option>Kitchen and Utensils</option>
          </select>

          <textarea
            placeholder="Description (optional)"
            value={dropoff.description}
            onChange={(e) => setDropoff({ ...dropoff, description: e.target.value })}
          />

          <select
            value={dropoff.condition}
            onChange={(e) => setDropoff({ ...dropoff, condition: e.target.value })}
            required
          >
            <option value="">Select Item Condition</option>
            <option>Brand New</option>
            <option>Gently Used</option>
            <option>Needs Some Repair</option>
          </select>

          <input
            type="datetime-local"
            value={dropoff.datetime}
            onChange={(e) => setDropoff({ ...dropoff, datetime: e.target.value })}
            required
          />

          <button type="submit">Schedule Drop-off</button>
        </form>

          <form className="donate-form" onSubmit={handleSubmitPorter}>
              <h3>Request Porter Service</h3>

              <input
                type="text"
                placeholder="Your Name"
                value={porter.name}
                onChange={(e) => setPorter({ ...porter, name: e.target.value })}
                required
              />

              <input
                type="tel"
                placeholder="Mobile Number"
                value={porter.phone}
                onChange={(e) => setPorter({ ...porter, phone: e.target.value })}
                required
              />

              <input
                type="text"
                placeholder="Pickup Location"
                value={porter.location}
                onChange={(e) => setPorter({ ...porter, location: e.target.value })}
                required
              />

              <select
                value={porter.category}
                onChange={(e) => setPorter({ ...porter, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                <option>Clothing</option>
                <option>Assistive Devices</option>
                <option>Electronics</option>
                <option>Books & Braille</option>
                <option>Food & Nutrition</option>
                <option>Furniture</option>
                <option>Sports & Recreation</option>
                <option>Kitchen and Utensils</option>
              </select>

              <textarea
                placeholder="Description"
                value={porter.description}
                onChange={(e) => setPorter({ ...porter, description: e.target.value })}
              />

              <select
                value={porter.condition}
                onChange={(e) => setPorter({ ...porter, condition: e.target.value })}
                required
              >
                <option value="">Item Condition</option>
                <option>Brand New</option>
                <option>Gently Used</option>
                <option>Needs Repair</option>
              </select>

              <input
                type="datetime-local"
                value={porter.datetime}
                onChange={(e) => setPorter({ ...porter, datetime: e.target.value })}
                required
              />

              <button type="submit">Request Porter</button>
            </form>

        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© Uttkarsh Khanke | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default Donate;