import React from "react";
import { useState, useEffect } from "react";
import RoomCard from "./RoomCard";

function CardGrid({rooms}) {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    setHotels(rooms)
  },[]);

  return (
    <div class="container-fluid mb-5">
        {hotels?.length > 0 ?
        <div className="row">
            {hotels.map((hotel) => <div className="col-sm"><RoomCard room={hotel}/></div>)}
        </div>
        : (
          <div>
            <h2 className="text-center py-5">No Hotels Found!</h2>
          </div>
        )}
      </div>
  );
}

export default CardGrid;
