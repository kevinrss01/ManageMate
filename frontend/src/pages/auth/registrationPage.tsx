import React, { useState } from "react";
import {
  AiFillFacebook,
  AiOutlineGoogle,
  AiOutlineTwitter,
} from "react-icons/ai";
import Link from "next/link";
import { IoArrowBackSharp } from "react-icons/io5";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

export default function RegistrationPage() {
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [
    displayInvalidInputsErrorMessage,
    setDisplayInvalidInputsErrorMessage,
  ] = useState(false);
  const [next, setNext] = useState(false);

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Le prénom doit contenir au moins 3 caractères")
      .max(50, "Le prénom doit contenir au maximum 50 caractères")
      .matches(
        /^[a-zA-ZÀ-ÿ\s-]+$/,
        "Le prénom ne doit contenir que des lettres"
      )
      .required("Prénom requis"),
    lastName: Yup.string()
      .min(3, "Le nom doit contenir au moins 3 caractères")
      .max(50, "Le nom doit contenir au maximum 50 caractères")
      .matches(/^[a-zA-ZÀ-ÿ\s-]+$/, "Le nom ne doit contenir que des lettres")
      .required("Nom requis"),
    email: Yup.string().email("Email invalide").required("Email requis"),
    password: Yup.string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .max(100, "Le mot de passe doit contenir au maximum 100 caractères")
      .matches(
        /[A-Z]/,
        "Le mot de passe doit contenir au moins une majuscule et un caractère spécial"
      )
      .matches(
        /[^A-Za-z0-9]/,
        "Le mot de passe doit contenir au moins un caractère spécial et une majuscule"
      )
      .required("Mot de passe requis"),
  });

  const onSubmit = (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    const { email, password, firstName, lastName } = data;
    if (!data || !email || !password || !firstName || !lastName) {
      throw new Error("No data or invalid data");
    }

    console.log(data);
  };

  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  const checkValid = (
    field: any,
    errors: any,
    touched: any,
    setFieldValid: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (errors[field] && touched[field]) {
      setFieldValid(false);
      return (
        <p style={{ width: "90%", textAlign: "center", margin: 0 }}>
          {errors[field]}
        </p>
      );
    } else if (!touched[field]) {
      setFieldValid(false);
    } else if (touched[field] && !errors[field]) {
      setFieldValid(true);
    } else {
      setFieldValid(false);
    }
  };

  return (
    <>
      <div id="registrationPageContainer">
        <Link href="/" className="backButton">
          <IoArrowBackSharp className="backButtonIcon" />
        </Link>
        <div className="contentContainer">
          <div className="infoContainer">
            <div className="infoChildContainer">
              <div className="titleContainer">
                {next ? (
                  <>
                    <RiArrowGoBackFill
                      onClick={() => {
                        setNext(false);
                      }}
                      className="backInputButton"
                    />
                  </>
                ) : (
                  <>
                    <div></div>
                  </>
                )}
                <h2>CRÉER UN COMPTE</h2>
                <div></div>
              </div>
              <div className="inputsContainer">
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={SignupSchema}
                >
                  {({ errors, touched }) => (
                    <Form
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        height: "100%",
                        width: "100%",
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          if (!next) {
                            event.preventDefault();
                            // Empêche l'envoi du formulaire
                            if (emailValid && passwordValid) {
                              setNext(true);
                              setDisplayInvalidInputsErrorMessage(false);
                            } else {
                              setDisplayInvalidInputsErrorMessage(true);
                            }
                          }
                        }
                      }}
                    >
                      {!next ? (
                        <>
                          {checkValid("email", errors, touched, setEmailValid)}
                          <Field
                            type="text"
                            className="firstInput"
                            placeholder="Adresse mail"
                            style={{ marginBottom: "20px" }}
                            name="email"
                          />
                          {checkValid(
                            "password",
                            errors,
                            touched,
                            setPasswordValid
                          )}
                          <Field
                            className="firstInput"
                            type="password"
                            placeholder="Mot de passe"
                            name="password"
                          />
                          <div
                            onClick={() => {
                              if (emailValid && passwordValid) {
                                setNext(true);
                                setDisplayInvalidInputsErrorMessage(false);
                              } else {
                                setDisplayInvalidInputsErrorMessage(true);
                              }
                            }}
                            className="nextButton"
                          >
                            <span>SUIVANT</span>
                          </div>
                        </>
                      ) : (
                        <>
                          {errors.firstName && touched.firstName ? (
                            <div>{errors.firstName}</div>
                          ) : null}
                          <Field
                            type="text"
                            className="secondInput"
                            placeholder="Prénom"
                            style={{ marginBottom: "20px" }}
                            name="firstName"
                          />
                          {errors.lastName && touched.lastName ? (
                            <div>{errors.lastName}</div>
                          ) : null}
                          <Field
                            type="text"
                            className="secondInput"
                            placeholder="Nom"
                            name="lastName"
                          />
                          <>
                            <button type="submit" className="nextButton">
                              <span>VALIDER</span>
                            </button>
                          </>
                        </>
                      )}
                    </Form>
                  )}
                </Formik>
              </div>
              {displayInvalidInputsErrorMessage && (
                <span style={{ textAlign: "center", color: "red" }}>
                  Veuillez remplir correctement tous les champs avant de
                  continuer
                </span>
              )}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
