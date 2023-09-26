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
  const [response, setResponse] = useState("");
  let [username, setUsername] = useState("");

  // const takeData = async (e) => {
  //   if (response === 200){
  //   try {
  //     await axios
  //       .get(`https://127.0.0.1:8000/api/users/search/` + username)
  //       .then((res) => {
  //         setResponse(201);
  //         console.log(res.status, res.data);
  //         setUser(res.data);
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // };

  useEffect(() => {
    if (response.status === 200) {
      setAuthTokens(response.data);
      setUser(jwt_decode(response.data.access));
      localStorage.setItem("logedIn", JSON.stringify(response.data));
    }
  }, [response]);

  // useEffect(() => {
  //   if (user.length !== 0) {
  //     //console.log(user);
  //     localStorage.setItem("logedIn", JSON.stringify(user));
  //   }
  // }, [user]);

  let loginUser = async (e) => {
    e.preventDefault();
    setUsername(e.target.Username.value);
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
