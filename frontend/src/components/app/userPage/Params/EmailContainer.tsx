import { Field, Form, Formik } from "formik";
import { verificationUpdateEmailSchema } from "@/utils/yupShema";
import React from "react";
import { ComponentPropsUserPage } from "@/interfaces/UserPage";

const EmailContainer: React.FC<ComponentPropsUserPage> = ({
  userData,
  onSubmit,
}) => {
  // TODO : Ajouter un input pour le mot de passe afin d'authentifier l'utilisateur avant de modifier son email
  return (
    <div className="email-container">
      <h3>Changer son e-mail</h3>
      <Formik
        initialValues={{
          newEmail: userData.email || "",
        }}
        validationSchema={verificationUpdateEmailSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
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

export default EmailContainer;