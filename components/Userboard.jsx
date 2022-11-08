import React from "react";
import { auth } from "../firebase-config";

export default function Userboard() {
  return <div>{`Witam ${auth.currentUser.email}`}</div>;
}
