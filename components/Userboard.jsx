import React from "react";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase-config";

export default function Userboard() {
  const { logout } = useAuth();
  return (
    <div>
      {`Witam ${auth.currentUser.email}`}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
