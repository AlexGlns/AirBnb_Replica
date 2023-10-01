import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
  localStorage.getItem("logedIn")
    ? jwt_decode(localStorage.getItem("logedIn"))
    : ""
);

  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("logedIn")
      ? JSON.parse(localStorage.getItem("logedIn"))
      : ""
  );
  let [response, setResponse] = useState("");

  useEffect(() => {
    if (response.status === 200) {
      setAuthTokens(response.data);
      setUser(jwt_decode(response.data.access));
      localStorage.setItem("logedIn", JSON.stringify(response.data));
    }
  }, [response]);

 
  let loginUser = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`https://127.0.0.1:8000/api/token/`, {
          username: e.target.Username.value,
          password: e.target.Password.value,
        })
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
    console.log("data : ", response.access);
  };

  let logoutUser = () => {
    setUser([]);
    setAuthTokens([]);
    setResponse("");
    localStorage.removeItem("logedIn");
    window.location.reload(true);
  };

  let contextData = {
    loginUser: loginUser,
    response: response,
    user: user,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
