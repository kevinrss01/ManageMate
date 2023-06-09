import React, { useState } from "react";
import Link from "next/link";
import { IoArrowBackSharp } from "react-icons/io5";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Formik, Field, Form } from "formik";
import { verificationRegisterSchema } from "@/utils/yupShema";
import { useRouter } from "next/navigation";
import { RegisterMethods } from "@/components/auth/RegisterMethods";
import AuthAPI from "@/services/AuthAPI";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import toastMessage from "@/utils/toast";
import { RotatingLines } from "react-loader-spinner";

export default function RegistrationPage() {
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [
    displayInvalidInputsErrorMessage,
    setDisplayInvalidInputsErrorMessage,
  ] = useState(false);
  const [next, setNext] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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

    sessionStorage.setItem("registerData", JSON.stringify(data));

    router.push("/auth/paymentPage");
  };

  const handleEmailVerification = async (email: string) => {
    try {
      setLoading(true);
      const response: AxiosResponse<any, any> =
        await AuthAPI.verifyIfEmailExists(email);

      if (response.data.exists) {
        toastMessage("Cet email est déjà utilisé.", "error");
        return;
      }

      setNext(true);
    } catch (error) {
      console.error(error);
      toastMessage("Une erreur est survenue. Veuillez réessayer.", "error");
    } finally {
      setLoading(false);
      setDisplayInvalidInputsErrorMessage(false);
    }
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
        <p
          style={{ width: "90%", textAlign: "center", margin: 3, color: "red" }}
        >
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
                  validationSchema={verificationRegisterSchema}
                >
                  {({ errors, touched, values }) => (
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
                                handleEmailVerification(values.email);
                              } else {
                                setDisplayInvalidInputsErrorMessage(true);
                              }
                            }}
                            className="nextButton"
                          >
                            {loading ? (
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
                              <span>SUIVANT</span>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          {errors.firstName && touched.firstName ? (
                            <div style={{ color: "red" }}>
                              {errors.firstName}
                            </div>
                          ) : null}
                          <Field
                            type="text"
                            className="secondInput"
                            placeholder="Prénom"
                            style={{ marginBottom: "20px" }}
                            name="firstName"
                          />
                          {errors.lastName && touched.lastName ? (
                            <div style={{ color: "red" }}>
                              {errors.lastName}
                            </div>
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
              <RegisterMethods />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
