import React from "react";
import styles from "../styles/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const githubIcon = <FontAwesomeIcon icon={faGithub} />;
  const { footerContainer, githubIconStyle } = styles;
  return (
    <div className={footerContainer}>
      <div className={githubIconStyle}>
        <a href="https://github.com/Tuptuus" target="_blank" rel="noreferrer">
          {githubIcon}
        </a>
      </div>
    </div>
  );
}
