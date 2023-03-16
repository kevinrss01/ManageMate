import React, { useEffect, useState } from "react";
import Navbar from "@/pages/components/app/Navbar";
import Welcome from "@/pages/components/app/homePage/Welcome";
import RightSide from "@/pages/components/app/homePage/RightSide";
import Main from "@/pages/components/app/homePage/Main";
import { useDispatch } from "react-redux";
import { update } from "../../../slices/userSlice";

export default function Homepage() {
  //Redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      update({
        firstName: "Kevin",
        lastName: "Rousseau",
        email: "kevin.rousseau3@gmail.com",
      })
    );
  }, [dispatch]);

  return (
    <div className="homePageContainer">
      <Navbar />
      <main className="mainPageContainer">
        <Welcome />
        <Main />
      </main>
      <RightSide />
    </div>
  );
}
