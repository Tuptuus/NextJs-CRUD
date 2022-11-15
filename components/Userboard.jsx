import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import styles from "../styles/Dashboard.module.css";
import Task from "./Task";
import { auth, db } from "../firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { async } from "@firebase/util";

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
  const [tasksToShow, setTasksToShow] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentEditing, setCurrentEditing] = useState("");

  const inputTaskHandle = (e) => {
    setTaskValue(e.target.value);
  };

  const uploadNewTask = async () => {
    if (taskValue !== "") {
      try {
        await setTaskValue("");
        const collRef = collection(db, currentUser.uid);
        const payload = { taskContent: taskValue, isCompleted: false };
        await addDoc(collRef, payload);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, currentUser.uid, id));
  };

  const handleEnterAddTask = (e) => {
    if (e.key === "Enter") {
      uploadNewTask();
    }
  };

  const completeTask = (id) => {
    let updatedTodos = tasksToShow.map(async (task) => {
      if (id === task.id) {
        setDoc(doc(db, currentUser.uid, task.id), {
          taskContent: task.taskContent,
          isCompleted: !task.isCompleted,
        });
        task.isCompleted = !task.isCompleted;
      }
      return task;
    });
    setTasksToShow(updatedTodos);
  };

  const editTaskValue = async (id, task, completed) => {
    if (!completed) {
      tasksToShow.map((task) => {
        if (id === task.id) {
          setTaskValue(task.taskContent);
          setEditMode(!editMode);
        }
      });
    }
  };

  const confirmEditTask = () => {};

  useEffect(() => {
    if (currentUser) {
      const tasksRef = collection(db, currentUser.uid);
      const tasksQuery = query(tasksRef);
      onSnapshot(tasksQuery, (snapshot) => {
        const tasks = [];
        snapshot.forEach((doc) => {
          tasks.push({ ...doc.data(), id: doc.id });
        });
        setTasksToShow(tasks);
      });
    }
  }, [currentUser]);

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
            onKeyPress={handleEnterAddTask}
          />
          {editMode ? (
            <button onClick={confirmEditTask} className={addTaskBtn}>
              Edit Task
            </button>
          ) : (
            <button onClick={uploadNewTask} className={addTaskBtn}>
              Add Task
            </button>
          )}
        </div>
        <div className={tasksContainer}>
          <Task
            data={tasksToShow}
            deleteTask={deleteTask}
            completeTask={completeTask}
            editTask={editTaskValue}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
