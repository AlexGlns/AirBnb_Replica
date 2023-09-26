import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import ReservationCard from "./ReservationCard";
import axios from "axios";

function Reservations() {
  const [reservations, setReservations] = useState([]); // Reservations of user
  const [isLoading, setIsLoading] = useState(false);

  let { user } = useContext(AuthContext);

  const searchReservations = async () => {
    try {
       axios
        .get("https://127.0.0.1:8000/api/reservations/users/" + user.user_id)
        .then((res) => {
          console.log(res.status, res.data);
          setReservations(res.data);
          console.log(reservations);
          setIsLoading(true);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    searchReservations();
  },[]);


  return (
    isLoading && (
    <div className="container-fluid m-2">
    <h2>Your Reservations</h2>
      {reservations?.length > 0 ? (
        <div className="row">
          {reservations.map((reservation) => (
            <div className="col-sm">
                <ReservationCard reservation={reservation}/>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-center py-5">You don't have any reseservations yet!</h2>
        </div>
      )}
    </div>)
    
  );
}

export default Reservations;
