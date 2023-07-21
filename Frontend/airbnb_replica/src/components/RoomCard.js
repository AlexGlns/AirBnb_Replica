import React from "react";

const room1 ={
  "Place": "Skiathos Xwra",
  "Type" : "Private Room",
  "Beds" : "3",
  "Cost" : "120",
  "Critic": "3.3"
}

function RoomCard() {
  return (
    <div className="container-fluid mt-5">
      <div className="card" style={{width:"20rem"}}>
        <img
          src="https://lagariahotel.gr/wp-content/uploads/2021/07/dasdasdasdwww.jpg"
          className="card-img-top"
          alt="Hotel Image"
        />
        <div className="card-body">
          <h5 className="card-title">{room1.Place}</h5>
          <p className="card-text">{room1.Type}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{"Number of Beds : " + room1.Beds}</li>
          <li className="list-group-item">{"Cost Per Day : " + room1.Cost}</li>
          <li className="list-group-item">{"Rating : " + room1.Critic}</li>
        </ul>
      </div>
    </div>
  );
}

export default RoomCard;
