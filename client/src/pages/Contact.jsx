import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!window.confirm("Send this message?")) return;

    try {
      await axios.post("http://localhost:5000/api/contact", form);
      alert("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch {
      alert("Failed to send message.");
    }
  };

  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’re here to help and answer your questions</p>
      </section>

      {/* MAIN */}
      <section className="contact-section">
        <div className="contact-container">

          {/* INFO CARD */}
          <div className="contact-info">
            <h2>Get in Touch</h2>

            <p>📍 Nagpur, Maharashtra, India</p>
            <p>📞 +91 9876543210</p>
            <p>📧 support@atmadeepum.org</p>

            <div className="hours">
              <h3>Working Hours</h3>
              <p>Mon – Sat: 9:00 AM – 6:00 PM</p>
            </div>

            <p className="contact-note">
              “Together, we can illuminate lives and restore vision.”
            </p>
          </div>

          {/* FORM */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send a Message</h2>

            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />

            <button type="submit">Send Message</button>
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

export default Contact;