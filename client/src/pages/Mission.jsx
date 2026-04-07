import React from "react";
import "../styles.css";

function Mission() {
  return (
    <div className="mission-page">

      {/* HERO / TITLE */}
      <section className="mission-hero">
        <h1>Our Mission</h1>
        <p className="mission-tagline">
          “Be a lamp unto yourself” — empowering every life to shine
        </p>
      </section>

      {/* MAIN MISSION TEXT */}
      <section className="mission-content">
        <p className="intro">
          At Atmadeepum Society, our mission is to ignite the inner light of
          visually impaired individuals by providing education, rehabilitation,
          and livelihood opportunities. We believe that every person deserves
          dignity, independence, and the ability to shape their own future.
        </p>
      </section>

      {/* CORE PILLARS */}
      <section className="mission-cards">

        <div className="card">
          <span className="icon">📚</span>
          <h3>Empower</h3>
          <p>
            Through Braille education, digital accessibility, and skill-building,
            we equip individuals with tools to succeed independently.
          </p>
        </div>

        <div className="card">
          <span className="icon">🔆</span>
          <h3>Heal</h3>
          <p>
            Eye care camps, assistive devices, and rehabilitation programs help
            restore confidence and improve quality of life.
          </p>
        </div>

        <div className="card">
          <span className="icon">🌐</span>
          <h3>Include</h3>
          <p>
            We promote inclusion by creating awareness and enabling equal
            participation in society and employment.
          </p>
        </div>

      </section>

      {/* QUOTE / BANNER */}
      <section className="mission-quote">
        <p>
          “Our mission is to illuminate lives by empowering individuals with the
          knowledge, skills, and confidence to lead independent and meaningful lives.”
        </p>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© Uttkarsh Khanke | All Rights Reserved</p>
      </footer>

    </div>
  );
}

export default Mission;