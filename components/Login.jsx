import React, { useState } from "react";
import { auth } from "../firebase-config";
import styles from "../styles/Login.module.css";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "@chakra-ui/react";

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
    Title,
    welcomeTitle,
    slideDesc,
    slideEnjoy,
    slideTop,
    slideMid,
    slideBottom,
    errorDiv,
    errorMessage,
  } = styles;

  const [slideCard, setSlideCard] = useState(true);
  const handleSlideCard = () => {
    setSlideCard(!slideCard);
    setLoginLoading(false);
    setRegisterLoading(false);
  };

  const [loginEmailInputValue, setLoginEmailInputValue] = useState("");
  const [loginPasswordInputValue, setLoginPasswordInputValue] = useState("");
  const [registerEmailInputValue, setRegisterEmailInputValue] = useState("");
  const [registerNickInputValue, setRegisterNickInputValue] = useState("");
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
    } else if (type == "registerNick") {
      setRegisterNickInputValue(e.target.value);
    } else if (type == "registerPassword") {
      setRegisterPasswordInputValue(e.target.value);
    } else if (type == "registerConfirmPassword") {
      setRegisterConfirmPasswordInputValue(e.target.value);
    }
  };

  const {
    signUp,
    login,
    setLoginLoading,
    loginLoading,
    registerLoading,
    setRegisterLoading,
    loginErrorMsg,
    registerErrorMsg,
  } = useAuth();
  const createNewUser = () => {
    setRegisterLoading(true);
    signUp(
      registerEmailInputValue,
      registerPasswordInputValue,
      registerConfirmPasswordInputValue,
      registerNickInputValue
    );
  };
  const signIn = () => {
    setLoginLoading(true);
    login(loginEmailInputValue, loginPasswordInputValue);
  };

  return (
    <div className={backgroundLogin}>
      <div className={wholeLoginContainer}>
        <div className={`${slideCardOver} ${slideCard ? slide : ""}`}>
          <div className={slideTop}>
            <p className={welcomeTitle}>
              Welcome to <span className={Title}>TupCrud</span>
            </p>
          </div>
          <div className={slideMid}>
            <p className={slideDesc}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint
              ipsum, odit ratione recusandae quaerat ab obcaecati iure quia
              culpa perferendis magni officia vitae facilis magnam in
              praesentium sit laboriosam quod!
            </p>
          </div>
          <div className={slideBottom}>
            <p className={slideEnjoy}>Enjoy ;)</p>
          </div>
        </div>
        <div className={loginSideContainer}>
          <div className={Top}>
            <p className={Title}>Login</p>
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
            <div className={errorDiv}>
              {loginErrorMsg ? (
                <span className={errorMessage}>{loginErrorMsg}</span>
              ) : null}
            </div>
            <button onClick={signIn} className={buttons}>
              <span style={{ paddingRight: 10 }}>Login</span>{" "}
              {loginLoading ? <Spinner size="md" /> : null}
            </button>
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
            <p className={Title}>Register</p>
            {auth.currentUser ? `Witaj ${auth.currentUser.email}` : null}
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
              type="text"
              placeholder="Enter your nickname"
              value={registerNickInputValue}
              onChange={(e) => handleInputs(e, "registerNick")}
              maxLength="15"
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
            <div className={errorDiv}>
              {registerErrorMsg ? (
                <span className={errorMessage}>{registerErrorMsg}</span>
              ) : null}
            </div>
            <button onClick={createNewUser} className={buttons}>
              <span style={{ paddingRight: 10 }}>Register</span>{" "}
              {registerLoading ? <Spinner size="md" /> : null}
            </button>
          </div>
          <div className={Bottom}>
            <p className={changeSide}>
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
