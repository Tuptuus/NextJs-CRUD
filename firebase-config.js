import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "next-crud-bba85.firebaseapp.com",
  projectId: "next-crud-bba85",
  storageBucket: "next-crud-bba85.appspot.com",
  messagingSenderId: "691745592733",
  appId: "1:691745592733:web:319dbdec19e4b86beb0b74",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
