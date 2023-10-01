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
