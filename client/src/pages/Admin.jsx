import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Admin = () => {
  const navigate = useNavigate();

  // PASSWORD
  useEffect(() => {
    if (sessionStorage.getItem("adminAccess") === "granted") return;
    const password = window.prompt("Enter admin password:");
    if (password === "uk123") {
      sessionStorage.setItem("adminAccess", "granted");
    } else {
      alert("Incorrect password! Redirecting to home.");
      navigate("/");
    }
  }, [navigate]);

  const [donations, setDonations] = useState([]);
  const [works, setWorks] = useState([]);
  const [dropoffs, setDropoffs] = useState([]);
  const [porters, setPorters] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [searchTxn, setSearchTxn] = useState("");
  const [searchWrk, setSearchWrk] = useState("");
  const [searchDropoff, setSearchDropoff] = useState("");
  const [searchPorter, setSearchPorter] = useState("");
  const [searchContact, setSearchContact] = useState("");

  const [newWork, setNewWork] = useState({
    title: "",
    image: "",
    amount: "",
    type: "ongoing",
  });

  // FETCH DATA
  const fetchData = async () => {
    const d = await axios.get("http://localhost:5000/api/donations");
    const w = await axios.get("http://localhost:5000/api/ourwork");
    const drop = await axios.get("http://localhost:5000/api/dropoff");
    const porter = await axios.get("http://localhost:5000/api/porterservice");
    const contactRes = await axios.get("http://localhost:5000/api/contact");

    setDonations(d.data);
    setWorks(w.data);
    setDropoffs(drop.data);
    setPorters(porter.data);
    setContacts(contactRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // WORK
  const addWork = async (e) => {
    e.preventDefault();
    if (!window.confirm("Add this work?")) return;
    await axios.post("http://localhost:5000/api/ourwork", newWork);
    alert("Work added!");
    setNewWork({ title: "", image: "", amount: "", type: "ongoing" });
    fetchData();
  };

  const deleteWork = async (id) => {
    if (!window.confirm("Delete this work?")) return;
    await axios.delete(`http://localhost:5000/api/ourwork/${id}`);
    fetchData();
  };

  const ChangeStatus = async (id) => {
    if (!window.confirm("Change work status?")) return;
    const work = works.find((w) => w._id === id);
    const updatedType =
      work.type === "completed" ? "ongoing" : "completed";

    const res = await axios.put(
      `http://localhost:5000/api/ourwork/${id}`,
      { type: updatedType }
    );

    setWorks((prev) =>
      prev.map((w) => (w._id === id ? res.data.work : w))
    );
  };

  // DONATION
  const approveDonation = async (id) => {
    if (!window.confirm("Approve donation?")) return;
    await axios.put(
      `http://localhost:5000/api/donations/approve/${id}`
    );
    fetchData();
  };

  // DROP-OFF
  const markDropoffCompleted = async (id) => {
    if (!window.confirm("Mark completed?")) return;
    const res = await axios.put(
      `http://localhost:5000/api/dropoff/${id}`,
      { status: "completed" }
    );
    setDropoffs((prev) =>
      prev.map((d) => (d._id === id ? res.data.dropoff : d))
    );
  };

  // PORTER
  const updatePorterStatus = async (id, status) => {
    if (!window.confirm("Update status?")) return;

    const res = await axios.put(
      `http://localhost:5000/api/porterservice/${id}`,
      { status }
    );

    setPorters((prev) =>
      prev.map((p) => (p._id === id ? res.data.item : p))
    );
  };

  // CONTACT
  const markContacted = async (id) => {
    if (!window.confirm("Mark contacted?")) return;

    const res = await axios.put(
      `http://localhost:5000/api/contact/${id}`,
      { status: "contacted" }
    );

    setContacts((prev) =>
      prev.map((c) => (c._id === id ? res.data.contact : c))
    );
  };

  return (
    <div className="admin">
      <h1 className="title">Admin Dashboard</h1>

      {/* ADD WORK */}
      <div className="section">
        <h2>Add Work</h2>
        <form onSubmit={addWork} className="form">
          <input
            placeholder="Title"
            value={newWork.title}
            onChange={(e) =>
              setNewWork({ ...newWork, title: e.target.value })
            }
          />
          <input
            placeholder="Image URL"
            value={newWork.image}
            onChange={(e) =>
              setNewWork({ ...newWork, image: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Amount"
            value={newWork.amount}
            onChange={(e) =>
              setNewWork({ ...newWork, amount: e.target.value })
            }
          />
          <select
            value={newWork.type}
            onChange={(e) =>
              setNewWork({ ...newWork, type: e.target.value })
            }
          >
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
          <button className="primary-btn">Add Work</button>
        </form>
      </div>

      {/* WORK */}
      <div className="section">
        <h2>Manage Work</h2>
        <input
          className="search"
          placeholder="Search work..."
          value={searchWrk}
          onChange={(e) => setSearchWrk(e.target.value)}
        />
        <div className="grid">
          {works
            .filter((w) =>
              w.title?.toLowerCase().includes(searchWrk.toLowerCase())
            )
            .map((w) => (
              <div className="card" key={w._id}>
                <img src={w.image} alt="" />
                <h3>{w.title}</h3>
                <p>₹{w.amount}</p>
                <span className={`badge ${w.type}`}>
                  {w.type}
                </span>
                <div className="btn-group">
                  <button
                    className="danger"
                    onClick={() => deleteWork(w._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="secondary"
                    onClick={() => ChangeStatus(w._id)}
                  >
                    Toggle Status
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Repeat same UI pattern for others */}

      {/* DONATIONS */}
      <div className="section">
        <h2>Donations</h2>
        <input
          className="search"
          placeholder="Search UPI Transaction ID..."
          value={searchTxn}
          onChange={(e) => setSearchTxn(e.target.value)}
        />
        <div className="grid">
          {donations
            .filter((d) =>
              d.upiTransactionId
                ?.toLowerCase()
                .includes(searchTxn.toLowerCase())
            )
            .map((d) => (
              <div className="card" key={d._id}>
                <h3>{d.name}</h3>
                <p>₹{d.amount}</p>
                <p>UPI Txn ID: {d.upiTransactionId}</p>
                <span className={`badge ${d.status}`}>
                  {d.status}
                </span>
                {d.status === "pending" && (
                  <button
                    className="primary-btn"
                    onClick={() => approveDonation(d._id)}
                  >
                    Approve
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* DROP-OFF */}
      <div className="section">
        <h2>Drop-offs</h2>
        <input
          className="search"
          placeholder="Search..."
          value={searchDropoff}
          onChange={(e) => setSearchDropoff(e.target.value)}
        />
        <div className="grid">
          {dropoffs
            .filter(
              (d) =>
                d.name
                  ?.toLowerCase()
                  .includes(searchDropoff.toLowerCase()) ||
                d.phone?.includes(searchDropoff)
            )
            .map((d) => (
              <div className="card" key={d._id}>
                <h3>{d.name}</h3>
                <p>{d.phone}</p>
                <p>📍 Atmadeepum NGO Office , Imagination</p>
                <p>Drop-off Date: {new Date(d.datetime).toLocaleString()}</p>
                <p><strong>Category:</strong> {d.category}</p>
                <p><strong>Description:</strong> {d.description || "N/A"}</p>
                <p><strong>Condition:</strong> {d.condition}</p>
                <span className={`badge ${d.status}`}>
                  {d.status}
                </span>
                {d.status === "pending" && (
                  <button
                    className="primary-btn"
                    onClick={() =>
                      markDropoffCompleted(d._id)
                    }
                  >
                    Complete
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* PORTER */}
      <div className="section">
        <h2>Porter Requests</h2>
        <input
          className="search"
          placeholder="Search..."
          value={searchPorter}
          onChange={(e) => setSearchPorter(e.target.value)}
        />
        <div className="grid">
          {porters
            .filter(
              (p) =>
                p.name
                  ?.toLowerCase()
                  .includes(searchPorter.toLowerCase()) ||
                p.phone?.includes(searchPorter)
            )
            .map((p) => (
              <div className="card" key={p._id}>
                <h3>{p.name}</h3>
                <p>{p.phone}</p>
                <p>📍 {p.location}</p>
                <p>Pickup Date: {new Date(p.datetime).toLocaleString()}</p>
                <p><strong>Category:</strong> {p.category}</p>
                <p><strong>Description:</strong> {p.description || "N/A"}</p>
                <p><strong>Condition:</strong> {p.condition}</p>
                <span className={`badge ${p.status}`}>
                  {p.status}
                </span>

                {p.status === "pending" && (
                  <button
                    className="primary-btn"
                    onClick={() =>
                      updatePorterStatus(p._id, "porterbooked")
                    }
                  >
                    Book
                  </button>
                )}

                {p.status === "porterbooked" && (
                  <button
                    className="secondary"
                    onClick={() =>
                      updatePorterStatus(p._id, "completed")
                    }
                  >
                    Complete
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* CONTACT */}
      <div className="section">
        <h2>Contact Requests</h2>
        <input
          className="search"
          placeholder="Search..."
          value={searchContact}
          onChange={(e) => setSearchContact(e.target.value)}
        />
        <div className="grid">
          {contacts
            .filter(
              (c) =>
                c.name
                  ?.toLowerCase()
                  .includes(searchContact.toLowerCase()) ||
                c.email
                  ?.toLowerCase()
                  .includes(searchContact.toLowerCase())
            )
            .map((c) => (
              <div className="card" key={c._id}>
                <h3>{c.name}</h3>
                <p>{c.email}</p>
                <p>{c.message}</p>
                <span className={`badge ${c.status}`}>
                  {c.status}
                </span>

                {c.status === "pending" && (
                  <button
                    className="primary-btn"
                    onClick={() => markContacted(c._id)}
                  >
                    Contacted
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;