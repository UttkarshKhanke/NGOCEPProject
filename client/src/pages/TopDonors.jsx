import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

function TopDonors() {
  const [donors, setDonors] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/topdonors")
      .then(res => {
        setDonors(res.data);
        const total = res.data.reduce((sum, d) => sum + d.totalAmount, 0);
        setTotalDonations(total);
      })
      .catch(err => console.error(err));
  }, []);

  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <div className="donor-page">

      {/* HERO */}
      <section className="donor-hero">
        <h1>Top Donors</h1>
        <p>Celebrating the generous hearts who make change possible ❤️</p>
      </section>

      {/* TOTAL */}
      <div className="donor-total">
        <h2>
          Total Donation: ₹{Number(totalDonations).toLocaleString("en-IN")}
        </h2>
        <h3><p>Top Contributors</p></h3>
      </div>

      {/* TOP 3 HIGHLIGHT */}
      <section className="top3">
        {donors.slice(0, 3).map((d, index) => (
          <div className={`top-card rank-${index}`} key={index}>
            <h2>{getMedal(index)}</h2>
            <h3>{d.name}</h3>
            <p>₹{Number(d.totalAmount).toLocaleString("en-IN")}</p>
          </div>
        ))}
      </section>

      {/* FULL LIST */}
      <section className="donor-list">
        <h2>All Donors</h2>

        <div className="donor-table">
          <div className="donor-row header">
            <span>Rank</span>
            <span>Name</span>
            <span>Amount</span>
          </div>

          {donors.map((d, index) => (
            <div className="donor-row" key={index}>
              <span>{getMedal(index)}</span>
              <span>{d.name}</span>
              <span>₹{Number(d.totalAmount).toLocaleString("en-IN")}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© Uttkarsh Khanke | All Rights Reserved</p>
      </footer>

    </div>
  );
}

export default TopDonors;