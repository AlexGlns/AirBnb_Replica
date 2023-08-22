import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateUser from "../server/Api_Calls";

function MySignUp() {
  //const url = "http://127.0.0.1:8000/api/users/create/";
  const [userInfo, setUserInfo] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    //phoneNumber: "",
    userType: "Renter",
    password: "",
  });

  // function submit(e){
  //   e.preventDefault();
  //   {Axios.post(url, {
  //     username: userInfo.username,
  //     first_name: userInfo.first_name,
  //     last_name: userInfo.last_name,
  //     email: userInfo.email,
  //     //phoneNumber: userInfo.phoneNumber,
  //     password: userInfo.password,
  //   })
  //   .then(res=>{
  //     setUserInfo(res.data);
  //     console.log(res.userInfo);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   })
  // };
  // }

  function handleData(e) {
    const newdata = { ...userInfo };
    newdata[e.target.id] = e.target.value;
    setUserInfo(newdata);
    //console.log(newdata);
  }

  return (
    <div className="container rounded bg-light mt-5 py-1">
      <h2>Sign Up</h2>
      <form>
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
            // onChange={(e) => handleData(e)}
            id="phoneNumber"
            //value={userInfo.phoneNumber}
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
            <input type="password" id="form3Example4cd" className="form-control" />
          </div>
        </div>

        <button
          type="submit"
          onClick={async () => {
            console.log(userInfo);
            await axios
              .post(`http://127.0.0.1:8000/api/users/create/`, userInfo )
              .then((response) => {
                console.log(response.status, response.data);
              });
          }}
          className="btn btn-primary m-2"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default MySignUp;
