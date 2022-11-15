import Head from "next/head";
import { useEffect } from "react";
import Login from "../components/Login";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Home() {
  const { currentUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (currentUser) {
      router.push("MainPage");
    }
  }, [currentUser, router]);
  return (
    <>
      <Head>
        <title>TupCRUD</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </>
  );
}
