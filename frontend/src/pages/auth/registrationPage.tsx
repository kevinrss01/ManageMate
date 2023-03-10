import logo from "../../../public/images/ManageMate-logo.png";
import Image from "next/image";
import React, { useState } from "react";
export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [next, setNext] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    console.log(password);
  };

  return (
    <>
      <div id="registrationPageContainer">
        <div className="contentContainer">
          <div className="logoContainer">
            <Image
              style={{ height: "auto", width: "500Px" }}
              src={logo}
              alt={"logo"}
            />
          </div>
          <div className="infoContainer">
            <div className="infoChildContainer">
              <h2>CRÉER UN COMPTE</h2>
              <div className="inputsContainer">
                {!next ? (
                  <>
                    <input
                      type="text"
                      value={email}
                      placeholder="Adresse email"
                      onChange={handleEmailChange}
                      style={{ marginBottom: "20px" }}
                    />{" "}
                    <input
                      type="password"
                      value={password}
                      placeholder="Mot de passe"
                      onChange={handlePasswordChange}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div
                onClick={() => {
                  setNext(true);
                }}
                className="nextButton"
              >
                SUIVANT
              </div>
              <div className="divider">
                <hr className="solid"></hr>
                <span>Ou avec</span>
                <hr className="solid"></hr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
