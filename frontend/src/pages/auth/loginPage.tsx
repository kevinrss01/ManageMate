import React, { useEffect, useState } from "react";
import {
  AiFillFacebook,
  AiOutlineGoogle,
  AiOutlineTwitter,
} from "react-icons/ai";
import Link from "next/link";
import { IoArrowBackSharp } from "react-icons/io5";
import { Formik, Field, Form } from "formik";
import { verificationLoginSchema } from "@/utils/yupShema";
import { RotatingLines } from "react-loader-spinner";
import AuthAPI from "@/services/AuthAPI";
import toastMessage from "@/utils/toast";
import { useRouter } from "next/router";

export default function RegistrationPage() {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [
    displayInvalidCredentialsErrorMessage,
    setDisplayInvalidCredentialsErrorMessage,
  ] = useState<Boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/app/homepage");
    }
  }, [router]);

  const onSubmit = (data: { email: string; password: string }) => {
    setIsLoading(true);
    const { email, password } = data;
    AuthAPI.login(email, password)
      .then((response) => {
        localStorage.setItem("id", response.id);
        localStorage.setItem("token", response.accessToken);
        router.push("/app/homepage?successLogin=true");
      })
      .catch((error) => {
        console.error(error);
        if (error?.response?.data?.message?.includes("invalid credentials")) {
          setDisplayInvalidCredentialsErrorMessage(true);
          setIsLoading(false);
          return;
        }
        toastMessage(
          "Une erreur est survenue. Veuillez réessayer plus tard.",
          "error"
        );
        setIsLoading(false);
      });
  };

  const initialValues = {
    email: "",
    password: "",
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
                <div></div>
                <h2>SE CONNECTER</h2>
                <div></div>
              </div>
              <div className="inputsContainer">
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={verificationLoginSchema}
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
                    >
                      {errors.email && touched.email ? (
                        <div style={{ color: "red" }}>{errors.email}</div>
                      ) : null}

                      <Field
                        type="text"
                        className="firstInput"
                        placeholder="Adresse mail"
                        style={{ marginBottom: "20px" }}
                        name="email"
                      />
                      {errors.password && touched.password ? (
                        <div style={{ color: "red" }}>{errors.password}</div>
                      ) : null}
                      <Field
                        className="firstInput"
                        type="password"
                        placeholder="Mot de passe"
                        name="password"
                      />
                      {displayInvalidCredentialsErrorMessage && (
                        <>
                          <span
                            style={{
                              color: "red",
                              textAlign: "center",
                              marginTop: "10px",
                            }}
                          >
                            Combinaison mot de passe et email invalide
                          </span>
                        </>
                      )}
                      <button className="nextButton" type="submit">
                        {isLoading ? (
                          <>
                            <RotatingLines
                              strokeColor="grey"
                              strokeWidth="5"
                              animationDuration="0.75"
                              width="25"
                              visible={true}
                            />
                          </>
                        ) : (
                          <>
                            <span>Valider</span>
                          </>
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
              <div className="divider">
                <hr className="solid"></hr>
                <span className="pr-2 pl-2">Ou avec</span>
                <hr className="solid"></hr>
              </div>
              <div className="containerLoginWith">
                <div className="loginWith">
                  <div className="containerLogo colorFb1">
                    <AiFillFacebook className="iconSocialMedia" />
                  </div>
                  <div className="containerText colorFb2">
                    Connexion avec Facebook
                  </div>
                </div>

                <div className="loginWith">
                  <div className="containerLogo colorTwitter1">
                    <AiOutlineTwitter className="iconSocialMedia" />
                  </div>
                  <div className="containerText colorTwitter2">
                    Connexion avec Twitter
                  </div>
                </div>

                <div className="loginWith">
                  <div className="containerLogo colorGoogle1">
                    <AiOutlineGoogle className="iconSocialMedia" />
                  </div>
                  <div className="containerText colorGoogle2">
                    Connexion avec Google
                  </div>
                </div>
              </div>
              <div className="loginContainer">
                <p>Pas de compte ?</p>
                <Link href="/auth/registrationPage">Créer un compte</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
