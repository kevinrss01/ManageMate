import Link from "next/link";
import React from "react";
import {
  AiFillFacebook,
  AiOutlineGoogle,
  AiOutlineTwitter,
} from "react-icons/ai";

export function RegisterMethods() {
  return (
    <>
      <div className="divider">
        <hr className="solid"></hr>
        <span>Ou avec</span>
        <hr className="solid"></hr>
      </div>
      <div className="containerLoginWith">
        <div className="loginWith">
          <div className="containerLogo colorFb1">
            <AiFillFacebook className="iconSocialMedia" />
          </div>
          <div className="containerText colorFb2">
            Inscription avec Facebook
          </div>
        </div>

        <div className="loginWith">
          <div className="containerLogo colorTwitter1">
            <AiOutlineTwitter className="iconSocialMedia" />
          </div>
          <div className="containerText colorTwitter2">
            Inscription avec Twitter
          </div>
        </div>

        <div className="loginWith">
          <div className="containerLogo colorGoogle1">
            <AiOutlineGoogle className="iconSocialMedia" />
          </div>
          <div className="containerText colorGoogle2">
            Inscription avec Google
          </div>
        </div>
      </div>
      <div className="loginContainer">
        <p>Vous avez déjà un compte ?</p>
        <Link href="/auth/loginPage">Se connecter</Link>
      </div>
    </>
  );
}

export default RegisterMethods;
