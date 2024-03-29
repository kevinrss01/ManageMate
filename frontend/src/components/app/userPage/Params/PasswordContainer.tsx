import { Field, Form, Formik } from "formik";
import { verificationUpdatePasswordSchema } from "@/utils/yupShema";
import React from "react";
import { ComponentPropsUserPage } from "@/interfaces/UserPage";
import { ClipLoader } from "react-spinners";

const PasswordContainer: React.FC<ComponentPropsUserPage> = ({
  userData,
  onSubmit,
  isLoading,
  typeOfDataFetching,
}) => {
  return (
    <div className="password-container">
      <h3>Changer son mot de passe</h3>

      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          newPasswordConfirmation: "",
        }}
        validationSchema={verificationUpdatePasswordSchema}
        onSubmit={
          onSubmit
            ? onSubmit
            : () => {
                console.error("onSubmit is not defined");
              }
        }
      >
        {({ errors, touched }) => (
          <Form>
            <div className="input-container-password input-container">
              <div className="input-label">
                <label>Votre mot de passe</label>
                <Field
                  name="oldPassword"
                  placeholder="Ancien mot de passe"
                  type="password"
                  autoComplete="off"
                />
                {errors.oldPassword && touched.oldPassword ? (
                  <div style={{ color: "red" }}>{errors.oldPassword}</div>
                ) : (
                  <div style={{ height: "20px", width: "10px" }}> </div>
                )}
              </div>

              <div className="input-label">
                <label>Nouveau mot de passe</label>
                <Field
                  name="newPassword"
                  placeholder="Nouveau mot de passe"
                  type="password"
                  autoComplete="off"
                />
                {errors.newPassword && touched.newPassword ? (
                  <div style={{ color: "red" }}>{errors.newPassword}</div>
                ) : (
                  <div style={{ height: "20px", width: "10px" }}> </div>
                )}
              </div>

              <div className="input-label">
                <label>Confirmation du mot de passe</label>
                <Field
                  name="newPasswordConfirmation"
                  placeholder="Confirmation du nouveau mot de passe"
                  type="password"
                  autoComplete="off"
                />
                {errors.newPasswordConfirmation &&
                touched.newPasswordConfirmation ? (
                  <div style={{ color: "red" }}>
                    {errors.newPasswordConfirmation}
                  </div>
                ) : (
                  <div style={{ height: "20px", width: "10px" }}> </div>
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
              {isLoading && typeOfDataFetching === "password" ? (
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

export default PasswordContainer;
