import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState(null);
  const [registerErrorMsg, setRegisterErrorMsg] = useState(null);

  // if (email == "" || password == "" || confirmPassowrd == "") {
  //   setRegisterErrorMsg("Fill all data");
  //   setTimeout(() => {
  //     setRegisterErrorMsg(null);
  //   }, 3000);
  // } else

  async function signUp(email, password, confirmPassowrd) {
    try {
      if (email == "" || password == "" || confirmPassowrd == "") {
        setRegisterErrorMsg("Fill all data");
        setTimeout(() => {
          setRegisterErrorMsg(null);
        }, 3000);
        setRegisterLoading(false);
      } else if (password != confirmPassowrd) {
        setRegisterErrorMsg("Passwords are not the same");
        setTimeout(() => {
          setRegisterErrorMsg(null);
        }, 3000);
        setRegisterLoading(false);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setRegisterLoading(false);
      }
    } catch (error) {
      if (error.code == "auth/invalid-email") {
        setRegisterErrorMsg("Invalid email");
        setTimeout(() => {
          setRegisterErrorMsg(null);
        }, 3000);
      } else if (error.code == "auth/weak-password") {
        setRegisterErrorMsg("Too weak password");
        setTimeout(() => {
          setRegisterErrorMsg(null);
        }, 3000);
      } else if (error.code == "auth/invalid-password") {
        setRegisterErrorMsg(
          "Password must be a string with at least six characters"
        );
        setTimeout(() => {
          setRegisterErrorMsg(null);
        }, 3000);
      } else if (error.code == "auth/email-already-in-use") {
        setRegisterErrorMsg("This email already exists");
        setTimeout(() => {
          setRegisterErrorMsg(null);
        }, 3000);
      }
      setRegisterLoading(false);
      console.log(error.code);
    }
    return;
  }

  async function login(email, password) {
    try {
      if (email == "" || password == "") {
        setLoginErrorMsg("Fill all data");
        setTimeout(() => {
          setLoginErrorMsg(null);
        }, 3000);
        setLoginLoading(false);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setLoginLoading(false);
      }
    } catch (error) {
      if (error.code == "auth/wrong-password") {
        setLoginErrorMsg("Invalid Password");
        setTimeout(() => {
          setLoginErrorMsg(null);
        }, 3000);
      } else if (error.code == "auth/invalid-email") {
        setLoginErrorMsg("Invalid Email");
        setTimeout(() => {
          setLoginErrorMsg(null);
        }, 3000);
      } else if (error.code == "auth/user-not-found") {
        setLoginErrorMsg("User not found");
        setTimeout(() => {
          setLoginErrorMsg(null);
        }, 3000);
      } else if (error.code == "auth/too-many-requests") {
        setLoginErrorMsg("Try again later");
        setTimeout(() => {
          setLoginErrorMsg(null);
        }, 3000);
      }
      console.log(error.code);
      setLoginLoading(false);
    }
  }

  async function logout() {
    await signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    logout,
    login,
    loginLoading,
    setLoginLoading,
    registerLoading,
    setRegisterLoading,
    loginErrorMsg,
    setLoginErrorMsg,
    registerErrorMsg,
    setRegisterErrorMsg,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
