import { Field, Form, Formik } from "formik";
import { verificationUpdateEmailSchema } from "@/utils/yupShema";
import React, { useEffect, useState } from "react";
import { ComponentPropsUserPage } from "@/interfaces/UserPage";
import { ClipLoader } from "react-spinners";

const EmailContainer: React.FC<ComponentPropsUserPage> = ({
  userData,
  onSubmit,
  isLoading,
  typeOfDataFetching,
}) => {
  return (
    <div className="email-container">
      <h3>Changer son e-mail</h3>
      <Formik
        initialValues={{
          newEmail: userData.email || "",
          password: "",
        }}
        validationSchema={verificationUpdateEmailSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <div className="input-container-password input-container">
              <div className="input-label">
                <label>Écrivez notre nouvel email</label>
                <Field
                  name="newEmail"
                  placeholder="Mon nouvel email"
                  type="text"
                  autoComplete="off"
                />
                {errors.newEmail && touched.newEmail ? (
                  <div style={{ color: "red" }}>{errors.newEmail}</div>
                ) : (
                  <div style={{ height: "20px", width: "10px" }}> </div>
                )}
                <label htmlFor="">Votre mot de passe</label>
                <Field
                  name="password"
                  placeholder="Entrez votre mot de passe"
                  type="password"
                  autoComplete="off"
                />
                {errors.password && touched.password && (
                  <div style={{ color: "red" }}>{errors.password}</div>
                )}
              </div>
            </div>
            <button
              className="update-button"
              type="submit"
              style={{
                pointerEvents: isLoading ? "none" : "auto",
              }}
            >
              {isLoading && typeOfDataFetching === "email" ? (
                <ClipLoader size={20} color={"#fff"} />
              ) : (
                "Modifier"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmailContainer;
