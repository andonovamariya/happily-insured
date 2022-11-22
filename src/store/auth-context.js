import React, { useCallback, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  userEmail: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const retrieveStoredUser = () => {
  const storedToken = localStorage.getItem("token");
  const storedUserEmail = localStorage.getItem("userEmail");

  const storedUserData = {
    token: storedToken,
    userEmail: storedUserEmail,
  };
  return storedUserData;
};

export const AuthContextProvider = (props) => {
  const userData = retrieveStoredUser();

  let initialToken = "";
  let initialUserEmail = "";
  if (userData) {
    initialToken = userData.token;
    initialUserEmail = userData.userEmail;
  } else {
    initialToken = null;
    initialUserEmail = null;
  }
  const [token, setToken] = useState("" | initialToken);
  const [userEmail, setUserEmail] = useState("" | initialUserEmail);

  const userIsLoggedIn = !!token; // if token is a string that's not empty it will return true, if token is a string that is empty, it will return false

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
  }, []);

  const loginHandler = (token, userEmail) => {
    setToken(token);
    setUserEmail(userEmail);
    console.log(token);
    console.log(userEmail);
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", userEmail);
    }
  };

  const contextValue = {
    token: token,
    userEmail: userEmail,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
