
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Navbar = props => (
  <nav className="navbar navbar-default navbar-expand-lg navbar-light">
    <Link className="navbar-brand" to="/">
      <img className="NavLogo" src={logo} />
    </Link>
    <div>
      <ul className="navbar-nav">
        <li
          className={
            window.location.pathname === "/" ||
            window.location.pathname === "/game"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link to="/game" className="nav-link">
            Game
          </Link>
        </li>

        <li
          className={
            window.location.pathname === "/leaderboard"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link to="/score" className="nav-link">
            Score
          </Link>
        </li>
        
        <li><Link to="login">Login</Link></li>
      </ul>
    </div>
  </nav>
);

export default Navbar;