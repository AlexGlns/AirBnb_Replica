import React, { useEffect, useState } from "react";
import queryString from "query-string";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

function RoomDetails() {
  const [desplayData, setDesplayData] = useState([]);
  useEffect(() => {
    // Parse the query parameters from the URL
    const queryParams = queryString.parse(window.location.search);

    // Access the props data from the parsed query parameters
    const prop1 = queryParams.prop;
    const objData = JSON.parse(prop1);
    setDesplayData(objData);
    //console.log("Param : ", objData);
  }, []);

  const marker = {
    geocode: [48.86, 2.3522],
    popUp: "House Location",
  };

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [38, 38], // size of the icon
  });

  return (
    <div className="container-fluid py-4">
      <h2>{desplayData.Place}</h2>
      {/* Photo Grid */}
      <div className="row py-2 bg-light m-0">
        <div className="col-md-5 p-0">
          <img
            src={desplayData.Photo}
            style={{ height: "20rem", width: "25rem" }}
            alt="Hotel Image"
          />
        </div>
        <div className="col-md-7">
          <div className="row m-0">
            <div className="col-xs-6 p-0">grid</div>
            <div className="col-xs-6 p-0">grid</div>
          </div>
          <div className="row m-0">
            <div className="col-sm-4 p-0">grid</div>
            <div className="col-sm-4 p-0">grid</div>
            <div className="col-sm-4 p-0">grid</div>
          </div>
        </div>
      </div>
      <h4>Τύπος Δωματίου</h4>

      <div className="row  py-4">
        <div className="col-sm-4">
          <h4>Οικοδεσπότης : Όνομα Οικοδεσπότη</h4>
        </div>
        <div className="col-sm-4">
          <img
            className="card-img-top embed-responsive-item-4by3"
            style={{ height: "12rem" }}
            alt="User Image"
          />
        </div>
      </div>

      <div className="container-fluid-sm " style={{ width: "35rem" }}>
        <ul className="list-group py-4">
          <h5>Χώρος</h5>
          <li className="list-group-item">Αριθμός Κρεβατιών : </li>
          <li className="list-group-item">Αριθμός Μπάνιων : </li>
          <li className="list-group-item">Τύπος Ενοικιαζόμενου Χώρου : </li>
          <li className="list-group-item">Αριθμός Υπνοδωματίων : </li>
          <li className="list-group-item">Καθσιτικό : ΝΑΙ/ΟΧΙ</li>
          <li className="list-group-item">Εμβαδόν : </li>
        </ul>
      </div>

      <p className="lead py-4 bg-light">
        <h5>Περιγραφή : </h5>
        Σχόλια Εδώ
      </p>

      <div className="container-fluid-sm" style={{ width: "25rem" }}>
        <ul className="list-group py-4">
          <h5>Κανώνες Ενοικίασης</h5>
          <li className="list-group-item">Κάπνισμα : ΝΑΙ/ΟΧΙ</li>
          <li className="list-group-item">Κατοικίδια : ΝΑΙ/ΟΧΙ</li>
          <li className="list-group-item">Διοργάνωση Εκδηλώσεων : ΝΑΙ/ΟΧΙ</li>
          <li className="list-group-item">
            Ελάχιστος Αριθμός Ημερών Ενοικίασης :{" "}
          </li>
        </ul>
      </div>

      <div className="container-sm  py-2">
        <h5 className="py-4">Που θα βρίσκεστε </h5>
        <MapContainer
          center={[48.8566, 2.3522]}
          zoom={13}
          style={{ height: "80vh" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={marker.geocode} icon={customIcon}></Marker>
        </MapContainer>

        <div class="d-grid gap-2 py-4">
          <button class="btn btn-primary py-2" type="button">
            Κράτηση
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
