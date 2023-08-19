import React from "react";
import { useState, useEffect } from "react";
import RoomCard from "./RoomCard";

function CardGrid({rooms}) {

  return (
    <div class="container-fluid mb-5">
        {rooms?.length > 0 ?
        <div className="row">
            {rooms.map((room) => <div className="col-sm"><RoomCard room={room}/></div>)}
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
