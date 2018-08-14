import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Navbar = props => (
  <nav className="navbar navbar-default navbar-expand-lg navbar-light">
    <Link className="navbar-brand" to="/">
      HyperWord 2
    </Link>
    <div>
      <ul className="navbar-nav">
        <li
          className={
            window.location.pathname === "/" ||
            window.location.pathname === "/about"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link to="/" className="nav-link">
            About
          </Link>
        </li>
        <li
          className={
            window.location.pathname === "/discover"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link to="/discover" className="nav-link">
            Discover
          </Link>
        </li>
        <li
          className={
            window.location.pathname === "/search"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link to="/search" className="nav-link">
            Search
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
        <li
          className={
            window.location.pathname === "/game"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link to="/game" className="nav-link">
            Game
          </Link>
        </li>
        <li><Link to="login">Login</Link></li>
      </ul>
    </div>
  </nav>
);

export default Navbar;

{/* <nav class="navbar navbar-default navbar-expand-lg navbar-light">
        <div class="navbar-header d-flex col">
            <a class="navbar-brand" href="#">Hyper
                <b>Word</b>
            </a>
            <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle navbar-toggler ml-auto">
                <span class="navbar-toggler-icon"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <!-- Collection of nav links, forms, and other content for toggling -->
        <div id="navbarCollapse" class="collapse navbar-collapse justify-content-start">
            <ul class="nav navbar-nav navbar-right">
                <li class="nav-item">
                    <a href="" class="nav-link col-md-1">
                        <span class="glyphicon glyphicon-home "></span>Home</a>
                </li>
                <li class="nav-item">
                    <a href="signup.html" class="nav-link col-md-1">
                        <span class="glyphicon glyphicon-user "></span>Account</a>
                </li>
                <li class="nav-item">
                    <a href="leaderboard.html" class="nav-link col-md-1">
                        <span class="glyphicon glyphicon-list "></span>Score</a>
                </li>
                <li class="nav-item">
                    <a href="contact.html" class="nav-link col-md-1">
                        <span class="glyphicon glyphicon-leaf"></span>Contact</a>
                </li>
            </ul>
        </div>
    </nav> */}