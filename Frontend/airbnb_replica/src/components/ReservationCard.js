import React from "react";

function ReservationCard(reservation) {
  return (
    <div className="container-fluid mt-5">
        <div className="card-body">
          <h5 className="card-title">{}</h5>
          {/* <p className="card-text">{room.Type}</p> */}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {"Number of Beds : " }
          </li>
          <li className="list-group-item">{"Cost Per Day : "}</li>
        </ul>
      </div>
  );
}

export default ReservationCard;
