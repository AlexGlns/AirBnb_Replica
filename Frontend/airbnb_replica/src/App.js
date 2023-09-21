import React, {useContext} from 'react';
import MyNavBar from './components/MyNavBar';
import MySearch from './components/MySearch';
import MySignUp from './components/MySignUp';
import MyLogIn from './components/MyLogIn';
import RoomDetails from './components/RoomDetails';
import RoomUpload from './components/RoomUpload';
import AccountSettings from './components/AccountSettings';
import Reservations from './components/Reservations';
import {  AuthProvider } from './context/AuthContext.js'
import { Route, Routes } from "react-router-dom";

// const room1 = {
//   Place: "Skiathos Xwra",
//   Type: "Private Room",
//   Beds: "3",
//   Cost: "120",
//   Critic: "3.3",
//   Photo: "https://lagariahotel.gr/wp-content/uploads/2021/07/dasdasdasdwww.jpg"
// };

// const room2 = {
//   Place: "Xalkidikh",
//   Type: "Private Room",
//   Beds: "4",
//   Cost: "180",
//   Critic: "4.3",
//   Photo: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/05/hotel-photography-bedroom.jpg"
// };

//var hotels = [room1,room2,room2,room1,room1,room2,room1,room2,room2,room1,room1,room2,room1,room2,room2,room1,room1,room2,room1,room2,room2,room1,room1,room2,room1,room2,room2,room1,room1,room2,room1];

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <MyNavBar/>
      <Routes>
        <Route path="" element={<MySearch />}/>
        <Route path="/SignUp" element={<MySignUp />} />
        <Route path="/LogIn" element={<MyLogIn/>} />
        <Route path="/RoomDetails" element={<RoomDetails />} />
        <Route path="/RoomUpload" element={<RoomUpload />} />
        <Route path="/Reservations" element={<Reservations />} />
        <Route path="/Account/Manage" element={<AccountSettings />} />
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
