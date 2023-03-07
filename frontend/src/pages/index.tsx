import Head from "next/head";
import { Inter } from "next/font/google";
import Image from "next/image";
import logo from "../../public/images/ManageMate-logo.png";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next APP</title>
      </Head>
      <main className="mainHomePage">
        <div className="logInButton" id="button">
          Se connecter
        </div>
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
                className="buttonCreateAccount"
                id="button"
                onClick={() => {}}
              >
                Créer un compte
              </div>
            </div>
          </div>
          <div className="imageSide"></div>
        </div>
        <div className="secondContainer">
          <div className="titleSecondContainer">
            <img src="/images/ManageMate-logo-solo.png" alt="" />
            <h2>Qui Somme Nous</h2>
            <p>
              ManageMate est une application web haut de gamme qui permet de
              gérer et de synchroniser tous vos fichiers sur une même plateforme
              en toute sécurité, simplement et rapidement. Nous utilisons les
              technologies les plus récentes afin de rendre la meilleure
              expérience possible.
            </p>
          </div>
        </div>
        <div className="thirdContainer">
          <div></div>
          <div></div>
        </div>
        <div></div>
        <div></div>
      </main>
    </>
  );
}
