import React from "react";
import Userboard from "../components/Userboard";

export default function MainPage({ message }) {
  return (
    <>
      <Userboard message={message} />
    </>
  );
}

export async function getServerSideProps() {
  return { props: { message: "witam to jest z server side" } };
}
