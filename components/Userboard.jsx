import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import styles from "../styles/Dashboard.module.css";
import Task from "./Task";
import { db } from "../firebase-config";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function Userboard({ message }) {
  const {
    mainContainer,
    contentContainer,
    taskInput,
    addTaskBtn,
    inputContainer,
    tasksContainer,
  } = styles;

  const { currentUser } = useAuth();
  const [taskValue, setTaskValue] = useState("");

  const inputTaskHandle = (e) => {
    setTaskValue(e.target.value);
  };

  const uploadNewTask = async () => {
    if (taskValue !== "") {
      try {
        await setTaskValue("");
        const collRef = collection(db, currentUser.uid);
        const payload = { taskContent: taskValue };
        await addDoc(collRef, payload);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getTasks = async () => {
    // const querySnapshot = await getDocs(collection(db, currentUser.uid));
    // querySnapshot.forEach((doc) => {
    //   console.log(doc);
    // });
    // console.log(querySnapshot.docs);
  };

  return (
    <div className={mainContainer}>
      <Header />
      <div className={contentContainer}>
        <div className={inputContainer}>
          <input
            placeholder="Insert your task..."
            type="text"
            className={taskInput}
            value={taskValue}
            onChange={inputTaskHandle}
          />
          <button onClick={uploadNewTask} className={addTaskBtn}>
            Add Task
          </button>
          <button className={addTaskBtn} onClick={getTasks}>
            {message}
          </button>
        </div>
        <div className={tasksContainer}>
          <Task />
        </div>
      </div>
      <Footer />
    </div>
  );
}
