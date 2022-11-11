import React from "react";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const logoutIcon = <FontAwesomeIcon icon={faArrowRightFromBracket} />;
  const { currentUser, logout } = useAuth();
  const { headerContainer, Left, Right, userName, logoutIconSpan } = styles;
  return (
    <div className={headerContainer}>
      <div className={Left}>
        Welcome <span className={userName}>{currentUser.displayName}</span>
      </div>
      <div className={Right}>
        <span onClick={logout} className={logoutIconSpan}>
          {logoutIcon}
        </span>
      </div>
    </div>
  );
}
