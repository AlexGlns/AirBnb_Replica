import React from "react";
import { useState } from "react";
import axios from "axios";

function MySignUp() {

  const [userInfo, setUserInfo] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: '',
    user_type: "renter",
    password: "",
  });

  const [response, setResponse] = useState("");

  const handleSubmit = (event) => {
    console.log("handleSubmit ran");
    event.preventDefault();
  };
  const [repeatPass, setRepeatPass] = useState("");

  function handleData(e) {
    const newdata = { ...userInfo };
    newdata[e.target.id] = e.target.value;
    setUserInfo(newdata);
    console.log(newdata);
  }

  return (
    <div className="container rounded bg-light mt-5 py-1">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group py-1">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => handleData(e)}
            id="username"
            value={userInfo.username}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-1 py-1">
            <div className="form-outline">
              <label className="form-label" htmlFor="form3Examplev2">
                First name
              </label>

              <input
                type="text"
                onChange={(e) => handleData(e)}
                id="first_name"
                value={userInfo.first_name}
                className="form-control form-control-lg"
              />
            </div>
          </div>
          <div className="col-md-6 mb-1 py-1">
            <div className="form-outline">
              <label className="form-label" htmlFor="form3Examplev3">
                Last name
              </label>

              <input
                type="text"
                onChange={(e) => handleData(e)}
                id="last_name"
                value={userInfo.last_name}
                className="form-control form-control-lg"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => handleData(e)}
            id="email"
            value={userInfo.email}
            placeholder="name@example.com"
          />
        </div>

        <div className="form-froup py-2">
          <label className="form-label" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            type="tel"
            onChange={(e) => handleData(e)}
            id="phone_number"
            value={userInfo.phone_number}
            className="form-control"
          />
        </div>

        <div className="form-check form-check-inline py-1">
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            Οικοδεσπότης
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineCheckbox2"
            value="option2"
          />
          <label className="form-check-label" htmlFor="inlineCheckbox2">
            Ενοικιαστής
          </label>
        </div>

        <div className="d-flex flex-row align-items-center mb-2">
          <i className="fas fa-lock fa-lg fa-fw"></i>
          <div className="form-outline flex-fill mb-0">
            <label className="form-label" htmlFor="form3Example4c">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => handleData(e)}
              id="password"
              value={userInfo.password}
              className="form-control"
            />
          </div>
        </div>

        <div className="d-flex flex-row align-items-center mb-2">
          <i className="fas fa-key fa-lg fa-fw"></i>
          <div className="form-outline flex-fill mb-0">
            <label className="form-label" htmlFor="form3Example4cd">
              Repeat your password
            </label>
            <input
              type="password"
              id="repeatPass"
              onChange={(e) => setRepeatPass(e.target.value)}
              value={repeatPass}
              className="form-control"
            />
          </div>
        </div>

        <button
          type="submit"
          id="signUpButton"
          disabled={isDesabled(userInfo, repeatPass)}
          onClick={async () => {
            console.log(repeatPass);
            try {
              await axios
                .post(`https://127.0.0.1:8000/api/users/create/`, userInfo)
                .then((res) => {
                  console.log(res.status, res.data);
                  setResponse(res);
                })
                .catch((error) => {
                  setResponse(400);
                  console.log(error);
                });
            } catch (e) {
              setResponse(400);
              console.log(e);
            }
          }}
          className="btn btn-primary m-2"
        >
          Sign Up
        </button>
        {userInfo.password !== repeatPass && (
          <h5 className="text-danger">Confirmation password does not match.</h5>
        )}
        {statusMessages(response)}
      </form>
    </div>
  );
}

function isDesabled(userInfo, pass2) {
  if (
    userInfo.username === "" ||
    userInfo.first_name === "" ||
    userInfo.last_name === "" ||
    userInfo.phoneNumber === "" ||
    userInfo.email === "" ||
    userInfo.password === ""
  ) {
    return true;
  }

  if (userInfo.password !== pass2) {
    return true;
  }
  return false;
}

function statusMessages(status) {
  if (status===""){
    return;
  }
  if (status >= 400) {
    return (
      <h5 className="text-danger">
        Error Creating User: Try another username or email
      </h5>
    );
  } else {
    return <h5 className="text-success">User Successfully signed up.</h5>;
  }
}

export default MySignUp;
