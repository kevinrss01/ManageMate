import React from "react";
import Navbar from "@/pages/components/app/Navbar";
import Welcome from "@/pages/components/app/Welcome";
import RightSide from "@/pages/components/app/RightSide";
export default function Homepage() {
  return (
    <div className="mainHomePageContainer">
      <Navbar />
      <div className="homePageContainer">
        <Welcome />
      </div>
      <RightSide />
    </div>
  );
}
