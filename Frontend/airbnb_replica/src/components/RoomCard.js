import React from "react";
import RoomDetails from "./RoomDetails";

function RoomCard({ room }) {
  const objString = JSON.stringify(room);
  return (
    <div className="container-fluid mt-5">
        <div className="card" style={{ width: "20rem" }} onClick={() => window.open(`https://localhost:3000/RoomDetails?prop=${objString}`)}>
          <img
            src={room.Photo}
            className="card-img-top embed-responsive-item-4by3"
            style={{ height: "12rem" }}
            alt="Hotel Image"
          />
          <div className="card-body">
            <h5 className="card-title">{room.Place}</h5>
            <p className="card-text">{room.Type}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {"Number of Beds : " + room.Beds}
            </li>
            <li className="list-group-item">{"Cost Per Day : " + room.Cost}</li>
            <li className="list-group-item">{"Rating : " + room.Critic}</li>
          </ul>
        </div>
    </div>


  );
}

export default RoomCard;
