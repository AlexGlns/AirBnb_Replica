import React from "react";
import RoomCard from "./RoomCard";

function CardGrid({rooms, searchTerms}) {

  return (
    <div className="container-fluid mb-5">
        {rooms?.length > 0 ?
        <div className="row">
            {rooms.map((room) => <div className="col-sm"><RoomCard room={room} searchTerms={searchTerms}/></div>)}
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
