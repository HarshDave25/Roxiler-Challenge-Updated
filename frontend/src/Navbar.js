import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav>
      <h1 className="brand-name">Roxiler Systems</h1>
      <ul>
        {[
          { path: "", label: "Tables" },
          { path: "statistics", label: "Statistics" },
          { path: "pie-chart", label: "Pie Chart" },
          { path: "bar-chart", label: "Bar Chart" }
        ].map(({ path, label }) => (
          <li key={path}><Link to={`/${path}`}>{label}</Link></li>
        ))}
      </ul>
    </nav>
  );
};
export default Navbar;
