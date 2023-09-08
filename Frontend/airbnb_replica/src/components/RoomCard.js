import React from "react";
import RoomDetails from "./RoomDetails";

function RoomCard({ room, searchTerms }) {
  const objString = JSON.stringify(room);
  const objString1 = JSON.stringify(searchTerms);
  return (
    <div className="container-fluid mt-5">
        <div className="card" style={{ width: "20rem" }} onClick={() => window.open(`https://localhost:3000/RoomDetails?prop=${objString}&prop1=${objString1}`)}>
          <img
            src={room.Photo}
            className="card-img-top embed-responsive-item-4by3"
            style={{ height: "12rem" }}
            alt="Hotel Image"
          />
          <div className="card-body">
            <h5 className="card-title">{room.location}</h5>
            {/* <p className="card-text">{room.Type}</p> */}
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {"Number of Beds : " + room.bed_number}
            </li>
            <li className="list-group-item">{"Cost Per Day : " + room.price}</li>
            <li className="list-group-item">{"Rating : to do"}</li>
          </ul>
        </div>
    </div>


  );
}

export default RoomCard;
