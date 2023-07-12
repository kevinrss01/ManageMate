import { Field, Form, Formik } from "formik";
import { verificationUpdatePasswordSchema } from "@/utils/yupShema";
import React from "react";
import { ComponentPropsUserPage } from "@/interfaces/UserPage";

const PasswordContainer: React.FC<ComponentPropsUserPage> = ({
  userData,
  onSubmit,
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
        onSubmit={onSubmit}
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

            <button className="update-button" type="submit">
              Modifier
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordContainer;
