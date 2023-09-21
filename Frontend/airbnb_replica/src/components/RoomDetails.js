import React, { useEffect, useState, useContext } from "react";
import queryString from "query-string";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import AuthContext from "../context/AuthContext";
import { Rate } from "antd";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function RoomDetails() {
  let { user } = useContext(AuthContext);

  const [showDialog, setShowDialog] = useState(false); // state to open alert dialog

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const [response, setResponse] = useState("");
  const [desplayData, setDesplayData] = useState([]);
  const [searchTerms, setSearchTerms] = useState([]);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const handleSubmit = (event) => {
    console.log("handleSubmit ran");
    event.preventDefault();
  };

  const [reservation_properties, setReservationProperties] = useState({
    start_date: "",
    end_date: "",
    property: "",
    renter: "",
  });

  useEffect(() => {
    // Parse the query parameters from the URL
    const queryParams = queryString.parse(window.location.search);

    // Access the props data from the parsed query parameters
    const prop1 = queryParams.prop;
    const prop2 = queryParams.prop1;
    const objData = JSON.parse(prop1);
    const objData1 = JSON.parse(prop2);

    setReservationProperties({
      start_date: objData1.departure_date,
      end_date: objData1.return_date,
      property: objData.id,
      renter: user.id,
    });
    console.log(reservation_properties);
    setLat(parseFloat(objData.lat));
    setLng(parseFloat(objData.lng));
    setSearchTerms(objData1);
    setDesplayData(objData);
  }, []);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [38, 38], // size of the icon
  });

  return (
    <div className="container-fluid py-4">
      <h2>{desplayData.location}</h2>
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
          <li className="list-group-item">
            Αριθμός Κρεβατιών : {desplayData.bed_number}
          </li>
          <li className="list-group-item">
            Αριθμός Μπάνιων : {desplayData.bathroom_number}
          </li>
          <li className="list-group-item">
            Τύπος Ενοικιαζόμενου Χώρου : to do{" "}
          </li>
          <li className="list-group-item">
            Αριθμός Υπνοδωματίων : {desplayData.bed_number}
          </li>
          <li className="list-group-item">
            Καθσιτικό : {desplayData.living_room}
          </li>
          <li className="list-group-item">Εμβαδόν : {desplayData.size} τ.μ.</li>
        </ul>
      </div>

      <p className="lead py-4 bg-light">
        <h5>Περιγραφή : </h5>
        {desplayData.description}
      </p>

      <div className="container-fluid-sm" style={{ width: "25rem" }}>
        <ul className="list-group py-4">
          <h5>Κανώνες Ενοικίασης</h5>
          <li className="list-group-item">Κάπνισμα : {desplayData.smoking}</li>
          <li className="list-group-item">Κατοικίδια : {desplayData.pets}</li>
          <li className="list-group-item">
            Διοργάνωση Εκδηλώσεων : {desplayData.events}
          </li>
          <li className="list-group-item">
            Ελάχιστος Αριθμός Ημερών Ενοικίασης :
            {desplayData.min_number_reservation}
          </li>
        </ul>
      </div>

      <div className="container-sm  py-2">
        {lat !== 0 ? desplayMap(lat, lng, customIcon) : null}

        <div class="d-grid gap-2 py-4">
          <button class="btn btn-primary py-2" onClick={open} type="button">
            Κράτηση
          </button>

          <div>
            {showDialog && (
              <>
                <Alert variant="warning">
                  <Alert.Heading>My Alert</Alert.Heading>
                  <p>Are you sure you want to make this reseravation ?</p>
                  <hr />
                  <div className="d-flex justify-content">
                    <Button
                      className="m-2"
                      variant="success"
                      onClick={async () => {
                        console.log(reservation_properties);
                        try {
                          await axios
                            .post(
                              `https://127.0.0.1:8000/api/reservations/create/`,
                              reservation_properties
                            )
                            .then((res) => {
                              console.log(res.status, res.data);
                              setResponse(res);
                            })
                            .catch((error) => {
                              setResponse(400);
                              console.log(error);
                            });
                        } catch (e) {
                          setResponse(400);
                          console.log(e);
                        }
                        close()
                      }
                    }
                    >
                      Yes
                    </Button>
                    <Button
                      className="m-2"
                      variant="danger"
                      onClick={() => close()}
                    >
                      No
                    </Button>
                  </div>
                </Alert>
              </>
            )}
          </div>
        </div>
        {statusMessages(response)}
      </div>

      <div className="container rounded bg-light mt-5 py-1">
        <h3>Rate Room : </h3>
        <form onSubmit={handleSubmit}>
          <Rate
            tooltips={["Very Bad", "Poor", "Ok", "Good", "Excellent"]}
            allowHalf
          />
          <div className="form-group py-1">
            <label htmlFor="exampleFormControlTextarea1">Comments</label>
            <textarea className="form-control" rows="3"></textarea>
          </div>

          <button type="submit" className="btn btn-primary m-2">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default RoomDetails;

function desplayMap(lat, lng, customIcon) {
  return (
    <div>
      <h5 className="py-4">Που θα βρίσκεστε </h5>
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        style={{ height: "80vh" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={customIcon}></Marker>
      </MapContainer>
    </div>
  );
}

function statusMessages(status) {
  if (status === "") {
    return;
  }
  if (status >= 400) {
    return <h5 className="text-danger">Something went wrong.</h5>;
  } else {
    return <h5 className="text-success">Reservation created !</h5>;
  }
}
