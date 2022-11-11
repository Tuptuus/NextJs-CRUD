import React from "react";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";
import Header from "./Header";
import styles from "../styles/Dashboard.module.css";

export default function Userboard() {
  const { mainContainer, contentContainer } = styles;
  const { currentUser, logout } = useAuth();
  return (
    <div className={mainContainer}>
      <Header />
      <div className={contentContainer}>
        {`Witam ${currentUser.displayName}`}
        <button onClick={logout}>Logout</button>
      </div>
      <Footer />
    </div>
  );
}
