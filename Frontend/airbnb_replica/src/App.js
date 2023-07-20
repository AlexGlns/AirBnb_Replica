import React from 'react';
import MyNavBar from './components/MyNavBar';
import MySearch from './components/MySearch';
import MySignUp from './components/MySignUp';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <MyNavBar />
      <Routes>
        <Route path="" element={<MySearch />} />
        <Route path="/SignUp" element={<MySignUp />} />
      </Routes>
    </div>
  );
}

export default App;
