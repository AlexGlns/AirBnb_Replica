import React from "react";
import RoomCard from "./RoomCard";

function CardGrid(params) {
  return (
    <div class="container-fluid mb-5">
      <div class="row">
        <div class="col-sm"><RoomCard/></div>
        <div class="col-sm"><RoomCard/></div>
        <div class="col-sm"><RoomCard/></div>
        <div class="col-sm"><RoomCard/></div>
        <div class="col-sm"><RoomCard/></div>
        <div class="col-sm"><RoomCard/></div>
        <div class="col-sm"><RoomCard/></div>
        <div class="col-sm"><RoomCard/></div>
        <div class="col-sm"><RoomCard/></div>
        <div class="col-sm"><RoomCard/></div>
      </div>
    </div>
  );
}

export default CardGrid;
