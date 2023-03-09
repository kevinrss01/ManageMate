import Image from "next/image";
import logo from "../../../../public/images/ManageMate-logo.png";
import React, { useEffect, useState } from "react";

export default function FirstPart() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.pageYOffset);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="firstContainer">
        <div className="textSide">
          <div className="imageContainer">
            <Image className="logoHomePage" src={logo} alt="logo" />
          </div>
          <div className="mainTextContainer">
            <div className="h1">
              <h1>
                L’optimisation
                <br />
                De votre entreprise
                <br />
                Commence ici
              </h1>
            </div>
            <div className="p">
              <span>Par Kevin R. et Kilian M.</span>
            </div>
          </div>
          <div className="createAccountBtnContainer">
            <div
              className={
                scrollPosition >= 683
                  ? "buttonCreateAccountFixed"
                  : "buttonCreateAccount"
              }
              id="button"
              onClick={() => {}}
            >
              Créer un compte
            </div>
          </div>
        </div>
        <div className="imageSide"></div>
      </div>
    </>
  );
}
