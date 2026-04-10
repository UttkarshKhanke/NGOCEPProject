import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles.css";

function OurWork() {
  const [works, setWorks] = useState([]);
  const [searchWrk, setSearchWrk] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/ourwork")
      .then(res => setWorks(res.data))
      .catch(err => console.log(err));
  }, []);

  // Filter
  const filteredWorks = works.filter(w =>
    w.title?.toLowerCase().includes(searchWrk.toLowerCase())
  );

  const completed = filteredWorks.filter(w => w.type === "completed");
  const ongoing = filteredWorks.filter(w => w.type === "ongoing");

  return (
    <div className="work-page">

      {/* HERO */}
      <section className="work-hero">
        <h1>Our Work</h1>
        <p>Transforming lives through compassion, action, and impact</p>
      </section>

      {/* SEARCH */}
      <div className="work-search">
        <input
          type="text"
          placeholder="Search campaigns..."
          value={searchWrk}
          onChange={(e) => setSearchWrk(e.target.value)}
        />
      </div>

      {/* COMPLETED */}
      <section className="work-section">
        <h2>Completed Campaigns</h2>

        <div className="work-grid">
          {completed.length > 0 ? (
            completed.map(w => (
              <div className="work-card" key={w._id}>
                <img src={w.image} alt={w.title} />
                <div className="work-content">
                  <h3>{w.title}</h3>
                  <p className="amount">₹{w.amount}</p>
                  <span className="tag completed">Completed</span>
                </div>
              </div>
            ))
          ) : (
            searchWrk && <p>No completed work found</p>
          )}
        </div>
      </section>

      {/* ONGOING */}
      <section className="work-section">
        <h2>Ongoing Campaigns</h2>

        <div className="work-grid">
          {ongoing.length > 0 ? (
            ongoing.map(w => (
              <div className="work-card" key={w._id}>
                <img src={w.image} alt={w.title} />
                <div className="work-content">
                  <h3>{w.title}</h3>
                  <p className="amount">₹{w.amount}</p>
                  <span className="tag ongoing">Ongoing</span>
                </div>
              </div>
            ))
          ) : (
            searchWrk && <p>No ongoing work found</p>
          )}
        </div>
      </section>

      {/* EMPTY STATE */}
      {filteredWorks.length === 0 && searchWrk && (
        <p className="no-result">No work found for "{searchWrk}"</p>
      )}

      {/* CTA */}
      <div className="work-cta">
        <Link to="/donate" className="btn">Support Our Work ❤️</Link>
      </div>

    </div>
  );
}

export default OurWork;