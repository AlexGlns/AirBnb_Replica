import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

function RoomUpload() {
  let { user } = useContext(AuthContext);

  const [roomInfo, setRoomInfo] = useState({
    location: "",
    price: "",
    available_from: "",
    available_to: "",
    size: "",
    bathroom_number: "",
    living_room: "Yes",
    bed_number: "",
    description: "",
    smoking: "Yes",
    pets: "Yes",
    events: "Yes",
    min_number_reservation: "",
    lat: "",
    lng: "",
    owner: user.id,
  });

  const [response, setResponse] = useState("");

  const handleSubmit = (event) => {
    console.log("handleSubmit ran");
    event.preventDefault();
  };

  function handleData(e) {
    const newdata = { ...roomInfo };
    newdata[e.target.id] = e.target.value;
    setRoomInfo(newdata);
    console.log(newdata);
  }

  return (
    <div className="container rounded bg-light mt-5 py-1 mb-5">
      <h2>Upload Room</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group py-1">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => handleData(e)}
            value={roomInfo.location}
            id="location"
          />
        </div>

        <div className="form-group  py-1" style={{ width: "22rem" }}>
          <label>Price (euros)</label>
          <input
            min="1"
            max="1000000"
            type="number"
            className="form-control"
            onChange={(e) => handleData(e)}
            value={roomInfo.price}
            id="price"
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-1 py-1">
            <label htmlFor="inputDate1" className="m-2">
              Available from :
            </label>
            <input
              type="date"
              id="available_from"
              onChange={(e) => handleData(e)}
              value={roomInfo.available_from}
            ></input>
          </div>

          <div className="col-md-6 mb-1 py-1">
            <label htmlFor="inputDate2" className="m-2">
              Available to :
            </label>
            <input
              type="date"
              id="available_to"
              onChange={(e) => handleData(e)}
              value={roomInfo.available_to}
            ></input>
          </div>
        </div>

        <div className="form-group  py-1" style={{ width: "22rem" }}>
          <label>Size (squere meters)</label>
          <input
            min="1"
            max="1000000"
            type="number"
            className="form-control"
            id="size"
            onChange={(e) => handleData(e)}
            value={roomInfo.size}
          />
        </div>

        <div className="form-group  py-1" style={{ width: "22rem" }}>
          <label>Bathroom number</label>
          <input
            min="1"
            max="1000000"
            type="number"
            className="form-control"
            id="bathroom_number"
            onChange={(e) => handleData(e)}
            value={roomInfo.bathroom_number}
          />
        </div>

        <div className="form-group  py-1" style={{ width: "22rem" }}>
          <label className="py-2" htmlFor="formGroupExampleInput">
            Living Room
          </label>
          <select
            className="form-select mb-2"
            id="living_room"
            onChange={(e) => handleData(e)}
            value={roomInfo.living_room}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group  py-1" style={{ width: "22rem" }}>
          <label>Bed number</label>
          <input
            min="1"
            max="1000000"
            type="number"
            className="form-control"
            id="bed_number"
            onChange={(e) => handleData(e)}
            value={roomInfo.bed_number}
          />
        </div>

        <div className="form-group py-1">
          <label htmlFor="exampleFormControlTextarea1">Description</label>
          <textarea
            className="form-control"
            id="description"
            onChange={(e) => handleData(e)}
            value={roomInfo.description}
            rows="3"
          ></textarea>
        </div>

        <div className="form-group  py-1" style={{ width: "22rem" }}>
          <label className="py-2" htmlFor="formGroupExampleInput">
            Smoking
          </label>
          <select
            className="form-select mb-2"
            id="smoking"
            onChange={(e) => handleData(e)}
            value={roomInfo.smoking}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group  py-1" style={{ width: "22rem" }}>
          <label className="py-2" htmlFor="formGroupExampleInput">
            Pets
          </label>
          <select
            className="form-select mb-2"
            id="pets"
            onChange={(e) => handleData(e)}
            value={roomInfo.pets}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group  py-1" style={{ width: "22rem" }}>
          <label className="py-2" htmlFor="formGroupExampleInput">
            Events
          </label>
          <select
            className="form-select mb-2"
            id="events"
            onChange={(e) => handleData(e)}
            value={roomInfo.events}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group  py-1" style={{ width: "22rem" }}>
          <label>Minimum Days for Reservation</label>
          <input
            min="1"
            max="1000000"
            type="number"
            className="form-control"
            id="min_number_reservation"
            onChange={(e) => handleData(e)}
            value={roomInfo.min_number_reservation}
          />
        </div>

        <div className="form-group  py-1" style={{ width: "22rem" }}>
          <label>Lat</label>
          <input
            type="number"
            className="form-control"
            id="lat"
            onChange={(e) => handleData(e)}
            value={roomInfo.lat}
          />
        </div>

        <div className="form-group  py-1" style={{ width: "22rem" }}>
          <label>Lng</label>
          <input
            type="number"
            className="form-control"
            id="lng"
            onChange={(e) => handleData(e)}
            value={roomInfo.lng}
          />
        </div>
        <div className="d-grid gap-2 py-1">
          <button
            type="submit"
            id="uploadRoomButton"
            className="btn btn-primary m-2"
            style={{ width: "22rem" }}
            disabled={isDesabled(roomInfo)}
            onClick={async () => {
              try {
                await axios
                  .post(
                    `https://127.0.0.1:8000/api/properties/create/`,
                    roomInfo
                  )
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
          >
            Post
          </button>
        </div>
      </form>
      {statusMessages(response)}
    </div>
  );
}

function isDesabled(roomInfo) {
  if (
    roomInfo.location === "" ||
    roomInfo.price === "" ||
    roomInfo.available_from === "" ||
    roomInfo.available_to === "" ||
    roomInfo.size === "" ||
    roomInfo.bathroom_number === "" ||
    roomInfo.bed_number === "" ||
    roomInfo.lat === "" ||
    roomInfo.lng === "" ||
    roomInfo.min_number_reservation === ""
  ) {
    return true;
  }

  return false;
}

function statusMessages(status) {
  if (status === "") {
    return;
  }
  if (status >= 400) {
    return (
      <h5 className="text-danger">
        Error Uploading Room. Something went wrong.
      </h5>
    );
  } else {
    return <h5 className="text-success">Room Uploaded Successfully</h5>;
  }
}

export default RoomUpload;
