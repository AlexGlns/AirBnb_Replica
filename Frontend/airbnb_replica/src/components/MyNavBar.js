import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userLogo from "../icons/black-male-user-symbol.png";
import AuthContext from "../context/AuthContext";
import NavDropdown from "react-bootstrap/NavDropdown";

function MyNavBar(props) {
  let { user, logoutUser } = useContext(AuthContext);

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
              <Link
                className="nav-link"
                to="/SignUp"
                onClick={(event) =>
                  isDesabledSignUpLogIn(user) ? event.preventDefault() : null
                }
              >
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/LogIn"
                onClick={(event) =>
                  isDesabledSignUpLogIn(user) ? event.preventDefault() : null
                }
              >
                Log In
              </Link>
            </li>
            {user.user_type === "host" ? (
              <li className="nav-item">
                <Link className="nav-link" to="/RoomUpload">
                  Upload Room
                </Link>
              </li>
            ) : null}
            {user.length !== 0 ? (
              <li className="nav-item dropdown">
                <NavDropdown title="My Profile" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/Reservations">
                    My Reservations
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/Account/Manage">
                    My Account
                  </NavDropdown.Item>
                </NavDropdown>
              </li>
            ) : null}
          </ul>
        </div>
        <form className="d-flex">
          <button
            className="btn btn-outline-dark me-2"
            disabled={isDesabledLogOut(user)}
            onClick={() => logoutUser()}
            type="button"
          >
            LogOut
          </button>
        </form>
        <div className="conainer">
          <span className="navbar-text mr-4">
            User : {user.length !== 0 ? user.username : "Anonymous"}{" "}
          </span>
          <img style={{ height: "2rem" }} src={userLogo} alt="User Image" />
        </div>
      </div>
    </nav>
  );
}

function isDesabledLogOut(user) {
  if (user.length === 0) {
    return true;
  }

  return false;
}

function isDesabledSignUpLogIn(user) {
  if (user.length !== 0) {
    return true;
  }

  return false;
}

export default MyNavBar;
