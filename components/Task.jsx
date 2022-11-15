import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Dashboard.module.css";

export default function Task(props) {
  const { data, deleteTask, completeTask, editTask } = props;
  const {
    task,
    Left,
    Right,
    taskContent,
    taskIcon,
    taskComplete,
    taskIconDisable,
  } = styles;
  const deleteIcon = <FontAwesomeIcon icon={faTrash} />;
  const editIcon = <FontAwesomeIcon icon={faPenToSquare} />;
  const checkIcon = <FontAwesomeIcon icon={faCheck} />;

  const showTask = data.map((item) => (
    <div
      key={item.id}
      className={`${task} ${item.isCompleted ? taskComplete : null}`}
    >
      <div className={Left}>
        <p className={taskContent}>{item.taskContent}</p>
      </div>
      <div className={Right}>
        <span onClick={() => deleteTask(item.id)} className={taskIcon}>
          {deleteIcon}
        </span>
        <span
          onClick={() => {
            editTask(item.id, item.taskContent, item.isCompleted);
          }}
          className={`${item.isCompleted ? taskIconDisable : taskIcon}`}
        >
          {editIcon}
        </span>
        <span onClick={() => completeTask(item.id)} className={taskIcon}>
          {checkIcon}
        </span>
      </div>
    </div>
  ));

  return <>{showTask}</>;
}
