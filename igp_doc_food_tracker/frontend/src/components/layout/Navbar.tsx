import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar" style={{ position: "sticky", top: 0 }}>
      <h1>IGP/DOC Food Tracker</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/foods">Foods</Link>
        <Link to="/map">Map</Link>
      </nav>
    </header>
  );
}
