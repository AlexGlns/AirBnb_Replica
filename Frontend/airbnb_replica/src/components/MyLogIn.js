import React from "react";

function MyLogIn() {
  return (
    <div className="container rounded bg-light mt-5 py-1">
      <h2>Log In</h2>
      <form>
        <div className="form-group py-1">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
          />
        </div>


        <div className="d-flex flex-row align-items-center mb-2">
          <i className="fas fa-lock fa-lg fa-fw"></i>
          <div className="form-outline flex-fill mb-0">
            <label className="form-label" htmlFor="form3Example4c">
              Password
            </label>
            <input type="password" id="form3Example4c" class="form-control" />
          </div>
        </div>


        <button type="submit" className="btn btn-primary m-2">
          Log in
        </button>
      </form>
    </div>
  );
}

export default MyLogIn;
