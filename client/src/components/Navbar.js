import { Link } from "react-router-dom";
import "../styles.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="nav-logo">Atmadeepum Society</h2>

      <div className="nav-links">
        <Link to="/">About</Link>
        <Link to="/mission">Mission</Link>
        <Link to="/ourwork">Our Work</Link>
        <Link to="/donate" className="donate-btn">Donate</Link>
        <Link to="/topdonors">Top Donors</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/admin" className="admin-link">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;