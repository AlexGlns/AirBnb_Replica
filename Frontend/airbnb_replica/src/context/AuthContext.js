import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useFetcher } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem('logedIn') ? JSON.parse(localStorage.getItem('logedIn')) : "");
  const [response, setResponse] = useState("");
  const [username,setUsername] = useState("");

  const takeData = async (e) => {
    if (response === 200){
    try {
      await axios
        .get(`https://127.0.0.1:8000/api/users/search/` + username)
        .then((res) => {
          setResponse(201);
          console.log(res.status, res.data);
          setUser(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  }

  };

  useEffect(() => {
    takeData();
  },[response]);

  useEffect(() => {
    if (user.length !== 0){
      console.log(user);
      localStorage.setItem('logedIn', JSON.stringify(user));
    }
  },[user]);

  let loginUser = async (e) => {
    e.preventDefault();
    setUsername(e.target.Username.value);
    try {
      await axios
        .post(`https://127.0.0.1:8000/api/users/login/`, {
          username: e.target.Username.value,
          password: e.target.Password.value,
        })
        .then((res) => {
          console.log(res.status, res.data);
          setResponse(res.status);
        })
        .catch((error) => {
          setResponse(400);
          console.log(error);
        });
    } catch (e) {
      setResponse(400);
      console.log(e);
    }


  };

  let logoutUser = () => {
    setUser([]);
    localStorage.removeItem('logedIn');
  }  

  let contextData = {
    loginUser: loginUser,
    response: response,
    user:user,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
