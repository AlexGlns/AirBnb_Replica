import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function MySearch() {
  const [rooms, setRooms] = useState([]); //Rooms returned from search
  const [searchTerms, setSearchTerms] = useState({
    destination: "",
    departure_date: "",
    return_date: "",
    persons_number: "",
  });

  function handleData(e) {
    const newdata = { ...searchTerms };
    newdata[e.target.id] = e.target.value;
    setSearchTerms(newdata);
    console.log(newdata);
  }

  return (
    <div className="container py-2">
      <form class="form-inline">
        <label htmlFor="inputCity" className="m-2 sr-only"></label>
        <input
          type="text"
          className="form-contol m-2"
          onChange={(e) => handleData(e)}
          id="destination"
          value={searchTerms.destination}
          placeholder="Type Destination"
        />
        <label htmlFor="inputDate1" className="m-2">Select Date Departure :</label>
        <input
          type="date"
          onChange={(e) => handleData(e)}
          id="departure_date"
          value={searchTerms.departure_date}
        ></input>

        <label htmlFor="inputDate2" className="m-2">
          Select Return Date :
        </label>
        <input
          type="date"
          onChange={(e) => handleData(e)}
          id="return_date"
          value={searchTerms.return_date}
        ></input>

        <label htmlFor="numberOfPersons" className="m-2"></label>
        <input
          type="number"
          onChange={(e) => handleData(e)}
          id="persons_number"
          value={searchTerms.persons_number}
          placeholder="Persons Number eg.2"
        ></input>
        <button
          type="submit"
          id="searchButton"
          className="btn btn-primary m-2"
          onClick={async () => {
            try {
              await axios.get(createUrl(searchTerms)).then((res) => {
                console.log(res.status, res.data);
                setRooms(res.data);
              });
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Search
        </button>
        {rooms?.length > 0 ? (
          <div>
            <h5>Rooms Found</h5>
          </div>
        ) : (
          <div>
            <h5 className="text-danger">No Rooms Found!</h5>
          </div>
        )}
      </form>
    </div>
  );
}

function createUrl(searchTerms) {
  var url = "http://127.0.0.1:8000/api/room-search/";
  if (searchTerms.destination !== "") {
    url = url + searchTerms.destination + "/";
  }

  if (searchTerms.departure_date !== "") {
    url = url + searchTerms.departure_date + "/";
  }

  if (searchTerms.return_date !== "") {
    url = url + searchTerms.return_date + "/";
  }

  if (searchTerms.persons_number !== "") {
    url = url + searchTerms.persons_number + "/";
  }
  console.log(url);
  return url;
}

export default MySearch;
