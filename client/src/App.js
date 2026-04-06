import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Mission from "./pages/Mission";
import OurWork from "./pages/OurWork";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import TopDonors from "./pages/TopDonors";
import Admin from "./pages/Admin";
import "./styles.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/ourwork" element={<OurWork />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/topdonors" element={<TopDonors />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;