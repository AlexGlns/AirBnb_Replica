import React, { useEffect, useState } from "react";
import axios from "axios";

function ReservationCard({ reservation }) {
  const [room, setRoom] = useState([]); // Get Room with certain id

  const getRoom = async () => {
    try {
      axios
        .get("https://127.0.0.1:8000/api/properties/" + reservation.property)
        .then((res) => {
          console.log(res.status, res.data);
          setRoom(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  console.log(reservation);

  useEffect(() => {
    getRoom();
  }, []);

  return (
    <div className="container-fluid mt-4">
      <div className="card" style={{ width: "15rem" }}>
        <div className="card-body">
          <h5 className="card-title">{room.location}</h5>
          {/* <p className="card-text">{room.location}</p> */}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {"Created at : " + reservation.created_at}
          </li>
          <li className="list-group-item">
            {"start-date : " + reservation.start_date}
          </li>
          <li className="list-group-item">
            {"End date : " + reservation.end_date}
          </li>
          <li className="list-group-item">
            <button
              className="btn btn-primary m-1"
              type="submit"
              onClick={async () => {
                try {
                  await axios
                    .delete(
                      `https://127.0.0.1:8000/api/reservations/users/${reservation.renter}/${reservation.id}/delete/`
                    )
                    .then((res) => {
                      console.log(res.status);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                } catch (e) {
                  console.log(e);
                }
                window.location.reload(true) //refresh page
              }
            }
            >
             Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ReservationCard;
