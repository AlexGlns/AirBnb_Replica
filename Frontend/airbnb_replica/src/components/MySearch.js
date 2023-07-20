import React from "react";

function MySearch() {
  return (
    <div className="container py-2">
      <form class="form-inline">
          <label for="inputCity" className="m-2 sr-only"></label>
          <input type="text" className="form-contol m-2" id="inputCity" placeholder="Type Destination"/>
          <label for="inputDate1">Select Date Departure: </label>
          <input type="date"></input>

          <label for="inputDate2" className="m-2">Select Return Date : </label>
          <input type="date"></input>

          <label for="numberOfPersons" className="m-2"></label>
          <input type="number" placeholder="Persons Number eg.2"></input>
        <button type="submit" className="btn btn-primary m-2">
          Search
        </button>
      </form>
    </div>
  );
}

export default MySearch;
