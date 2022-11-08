import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import styles from "../styles/Login.module.css";

export default function Login() {
  const {
    wholeLoginContainer,
    backgroundLogin,
    loginSideContainer,
    registerSideContainer,
    changeSide,
    changeSideAccount,
    inputs,
    buttons,
    slideCardOver,
    slide,
    Top,
    Mid,
    Bottom,
  } = styles;

  const [slideCard, setSlideCard] = useState(false);
  const handleSlideCard = () => {
    setSlideCard(!slideCard);
  };

  const [loginEmailInputValue, setLoginEmailInputValue] = useState("");
  const [loginPasswordInputValue, setLoginPasswordInputValue] = useState("");
  const [registerEmailInputValue, setRegisterEmailInputValue] = useState("");
  const [registerPasswordInputValue, setRegisterPasswordInputValue] =
    useState("");
  const [
    registerConfirmPasswordInputValue,
    setRegisterConfirmPasswordInputValue,
  ] = useState("");

  const handleInputs = (e, type) => {
    if (type == "loginEmail") {
      setLoginEmailInputValue(e.target.value);
    } else if (type == "loginPassword") {
      setLoginPasswordInputValue(e.target.value);
    } else if (type == "registerEmail") {
      setRegisterEmailInputValue(e.target.value);
    } else if (type == "registerPassword") {
      setRegisterPasswordInputValue(e.target.value);
    } else if (type == "registerConfirmPassword") {
      setRegisterConfirmPasswordInputValue(e.target.value);
    }
  };

  const createNewUser = () => {
    createUserWithEmailAndPassword(
      auth,
      registerEmailInputValue,
      registerPasswordInputValue
    );
  };

  return (
    <div className={backgroundLogin}>
      <div className={wholeLoginContainer}>
        <div className={`${slideCardOver} ${slideCard ? slide : ""}`}></div>
        <div className={loginSideContainer}>
          <div className={Top}>
            <p className="Title">Login</p>
          </div>
          <div className={Mid}>
            <input
              className={inputs}
              type="text"
              placeholder="Enter your email"
              value={loginEmailInputValue}
              onChange={(e) => handleInputs(e, "loginEmail")}
            />
            <input
              className={inputs}
              type="password"
              placeholder="Enter your password"
              value={loginPasswordInputValue}
              onChange={(e) => handleInputs(e, "loginPassword")}
            />
            <button className={buttons}>Login</button>
          </div>
          <div className={Bottom}>
            <p className={changeSide}>
              {`Don't have `}
              <span onClick={handleSlideCard} className={changeSideAccount}>
                account?
              </span>
            </p>
          </div>
        </div>
        <div className={registerSideContainer}>
          <div className={Top}>
            <p className="Title">Register</p>
          </div>
          <div className={Mid}>
            <input
              className={inputs}
              type="text"
              placeholder="Enter your email"
              value={registerEmailInputValue}
              onChange={(e) => handleInputs(e, "registerEmail")}
            />
            <input
              className={inputs}
              type="password"
              placeholder="Enter your password"
              value={registerPasswordInputValue}
              onChange={(e) => {
                handleInputs(e, "registerPassword");
              }}
            />
            <input
              className={inputs}
              type="password"
              placeholder="Confirm your password"
              value={registerConfirmPasswordInputValue}
              onChange={(e) => handleInputs(e, "registerConfirmPassword")}
            />
            <button onClick={createNewUser} className={buttons}>
              Register
            </button>
          </div>
          <div className={Bottom}>
            <p
              onClick={() => {
                console.log(auth.currentUser.email);
              }}
              className={changeSide}
            >
              You have{" "}
              <span onClick={handleSlideCard} className={changeSideAccount}>
                account?
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
