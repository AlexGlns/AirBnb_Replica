import React from "react";
import { Link } from "react-router-dom";


function MyNavBar(props) {

  return (
    <nav className="navbar navbar-expand-lg navbar-expand-mid navbar-expand-sm navbar-dark bg-primary">
      <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        AirBnB
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/SignUp">
              Sign Up
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/LogIn">
              Log In
            </Link>
          </li>
        </ul>
      </div>
      </div>
    </nav>
  );
}

export default MyNavBar;
