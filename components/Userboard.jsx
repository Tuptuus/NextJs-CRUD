import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import styles from "../styles/Dashboard.module.css";
import Task from "./Task";

export default function Userboard() {
  const {
    mainContainer,
    contentContainer,
    taskInput,
    addTaskBtn,
    inputContainer,
    tasksContainer,
  } = styles;

  return (
    <div className={mainContainer}>
      <Header />
      <div className={contentContainer}>
        <div className={inputContainer}>
          <input
            placeholder="Insert your task..."
            type="text"
            className={taskInput}
          />
          <button className={addTaskBtn}>Add Task</button>
        </div>
        <div className={tasksContainer}>
          <Task />
        </div>
      </div>
      <Footer />
    </div>
  );
}
