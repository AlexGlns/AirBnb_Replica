import React from 'react';
import MyNavBar from './components/MyNavBar';
import MySearch from './components/MySearch';
import MySignUp from './components/MySignUp';
import MyLogIn from './components/MyLogIn';
import CardGrid from './components/CardGrid';
import UsePagination from './components/UsePagination';
import { Route, Routes } from "react-router-dom";


const room1 = {
  Place: "Skiathos Xwra",
  Type: "Private Room",
  Beds: "3",
  Cost: "120",
  Critic: "3.3",
  Photo: "https://lagariahotel.gr/wp-content/uploads/2021/07/dasdasdasdwww.jpg"
};

const room2 = {
  Place: "Xalkidikh",
  Type: "Private Room",
  Beds: "4",
  Cost: "180",
  Critic: "4.3",
  Photo: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/05/hotel-photography-bedroom.jpg"
};

var hotels = [room1,room2,room2,room1,room1,room2,room1,room2,room2,room1,room1,room2,room1,room2,room2,room1,room1,room2,room1,room2,room2,room1,room1,room2,room1,room2,room2,room1,room1,room2,room1];

function App() {
  return (
    <div className="App">
      <MyNavBar />
      <Routes>
        <Route path="" element={<><MySearch /> <UsePagination records={hotels}/></>}/>
        <Route path="/SignUp" element={<MySignUp />} />
        <Route path="/LogIn" element={<MyLogIn/>} />
      </Routes>

    </div>
  );
}

export default App;
