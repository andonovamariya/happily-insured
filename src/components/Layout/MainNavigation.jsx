import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../../store/auth-context";

import Button from "../UI/Button";
import styles from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authContext = useContext(AuthContext);

  const isLoggedIn = authContext.isLoggedIn;
  const logoutHandler = () => {
    authContext.logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Happily Insured by Mariya</div>
      <nav>
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          {!isLoggedIn ? (
            <li>
              <NavLink to="/auth">Login</NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink to="/insurances">Insurances</NavLink>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <Button onClick={logoutHandler}>Logout</Button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
