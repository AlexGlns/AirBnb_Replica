import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import ReservationCard from "./ReservationCard";
import axios from "axios";


function Reservations(){
    const [reservations, setReservations] = useState([]); //Rooms returned from search

    let { user } = useContext(AuthContext);
    
    const searchReservations = async () => {
        try {
          await axios.get("https://127.0.0.1:8000/api/user/reservations/" + user.id).then((res) => {
            console.log(res.status, res.data);
            setRooms(res.data.results);
            console.log(rooms);
          });
        } catch (e) {
          console.log(e);
        }
      };

    return(
        <div className="container-fluid">

        </div>
    )
}

export default Reservations;