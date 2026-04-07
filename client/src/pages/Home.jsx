import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

function Home() {
  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">

          {/* LOGO */}
          <img src="/ads.png" alt="Atmadeepum Society Logo" className="logo" />

          <h1>
            Be the <span className="highlight">Light</span><br />
            in Someone's Darkness
          </h1>

          <p className="tagline">
            Illuminating Lives · Restoring Vision
          </p>

          <p className="hero-sub">
            Atmadeepum Society empowers visually impaired individuals through
            education, rehabilitation, and livelihood support across India.
          </p>

          <Link to="/donate" className="btn">
            Donate Now
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stat-card">
          <h2>10,000+</h2>
          <p>Lives Impacted</p>
        </div>

        <div className="stat-card">
          <h2>32</h2>
          <p>Districts Served</p>
        </div>

        <div className="stat-card">
          <h2>94%</h2>
          <p>Funds to Programs</p>
        </div>

        <div className="stat-card">
          <h2>20+</h2>
          <p>Years of Service</p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about">
        <h2>About Atmadeepum Society</h2>

        <p>
          Atmadeepum Society is a non-profit organization rooted in the philosophy
          <strong> “Be a lamp unto yourself (attadīpa)”</strong>.
          We work with visually impaired individuals to help them discover
          their inner strength and independence.
        </p>

        <p>
          From Braille education and assistive technology to healthcare and
          livelihood programs, we ensure every individual gets the opportunity
          to live with dignity and purpose.
        </p>
      </section>

      {/* SERVICES */}
      <section className="services">

        <h2>What We Do</h2>

        <div className="service-grid">

          <div className="service-card">
            <h3>📚 Education</h3>
            <p>
              Braille learning, screen-reader training, and digital accessibility tools.
            </p>
          </div>

          <div className="service-card">
            <h3>🏥 Healthcare</h3>
            <p>
              Free eye camps, surgeries, and assistive device distribution.
            </p>
          </div>

          <div className="service-card">
            <h3>💼 Livelihood</h3>
            <p>
              Skill development and employment opportunities for independence.
            </p>
          </div>

          <div className="service-card">
            <h3>🤝 Community</h3>
            <p>
              Support programs for families and social inclusion initiatives.
            </p>
          </div>

        </div>
      </section>

      {/* MISSION BANNER */}
      <section className="mission-banner">
        <p>
          “Our mission is to ignite the inner lamp of every visually impaired
          person — empowering them with knowledge, skills, and dignity.”
        </p>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© Uttkarsh Khanke | All Rights Reserved</p>
      </footer>

    </div>
  );
}

export default Home;