import React, { useState } from "react";
import Userboard from "../components/Userboard";

export default function MainPage({ message }) {
  const [e, setE] = useState("");
  return (
    <>
      <Userboard />
    </>
  );
}
