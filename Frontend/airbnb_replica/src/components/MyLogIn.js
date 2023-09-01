import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

function MyLogIn() {
  let {loginUser, response} = useContext(AuthContext);
  return (
    <div className="container rounded bg-light mt-5 py-1">
      <h2>Log In</h2>
      <form onSubmit={loginUser}>
        <div className="form-group py-1">
          <label>User Name</label>
          <input
            type="text"
            name="Username"
            className="form-control"
            id="Username"
          />
        </div>


        <div className="d-flex flex-row align-items-center mb-2">
          <i className="fas fa-lock fa-lg fa-fw"></i>
          <div className="form-outline flex-fill mb-0">
            <label className="form-label" htmlFor="form3Example4c">
              Password
            </label>
            <input type="password" name="Password" id="Password" class="form-control" />
          </div>
        </div>


        <button type="submit" className="btn btn-primary m-2">
          Log in
        </button>
        {statusMessages(response)}
      </form>
    </div>
  );
}

function statusMessages(status) {
  if (status===""){
    return;
  }
  if (status >= 400) {
    return (
      <h5 className="text-danger">
        Error Username or Password.
      </h5>
    );
  } else {
    return <h5 className="text-success">Login successful.</h5>;
  }
}

export default MyLogIn;
