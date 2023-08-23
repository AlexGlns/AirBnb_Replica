import React from "react";
import { Link } from "react-router-dom";
import userLogo from '../icons/black-male-user-symbol.png'

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
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/SignUp">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/LogIn">
                Log In
              </Link>
            </li>
          </ul>
        </div>
        <div className="conainer">
          <span className="navbar-text-hightlight-light mr-4">User : Anonymous </span>
          <img style={{height:"2rem"}}  src={userLogo} alt="User Image"/>
        </div>
      </div>
    </nav>
  );
}

export default MyNavBar;
