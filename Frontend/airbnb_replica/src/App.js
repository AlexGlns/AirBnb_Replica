import React from 'react';
import MyNavBar from './components/MyNavBar';
import MySearch from './components/MySearch';
import MySignUp from './components/MySignUp';
import MyLogIn from './components/MyLogIn';
import CardGrid from './components/CardGrid';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <MyNavBar />
      <Routes>
        <Route path="" element={<><MySearch /> <CardGrid/></>}/>
        <Route path="/SignUp" element={<MySignUp />} />
        <Route path="/LogIn" element={<MyLogIn/>} />
      </Routes>

    </div>
  );
}

export default App;
