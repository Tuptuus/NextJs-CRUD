import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Dashboard.module.css";

export default function Task() {
  const { task, Left, Right, taskContent, taskIcon } = styles;
  const deleteIcon = <FontAwesomeIcon icon={faTrash} />;
  const editIcon = <FontAwesomeIcon icon={faPenToSquare} />;
  const checkIcon = <FontAwesomeIcon icon={faCheck} />;

  return (
    <div className={task}>
      <div className={Left}>
        <p className={taskContent}>
          wynieś śmieci a następnie wyprowadź psa a potem kup itemy na obiad a
          potem kup coś tam i tego i tam tego i teges oraz śmeges i chuj kurwa
          do dupy i elo
        </p>
      </div>
      <div className={Right}>
        <span className={taskIcon}>{deleteIcon}</span>
        <span className={taskIcon}>{editIcon}</span>
        <span className={taskIcon}>{checkIcon}</span>
      </div>
    </div>
  );
}
