import { Field, Form, Formik } from "formik";
import { verificationUpdateInfoSchema } from "@/utils/yupShema";
import React from "react";
import { ComponentPropsUserPage } from "@/interfaces/UserPage";

const InfoContainer: React.FC<ComponentPropsUserPage> = ({
  userData,
  onSubmit,
}) => {
  return (
    <div className="personal-info-container">
      <h3>Informations personnelles</h3>

      <Formik
        initialValues={{
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
        }}
        validationSchema={verificationUpdateInfoSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="input-container">
              <div className="input-label">
                <label>Votre prénom</label>
                <Field name="firstName" placeholder="Prénom" />
                {errors.firstName && touched.firstName ? (
                  <div style={{ color: "red" }}>{errors.firstName}</div>
                ) : (
                  <div style={{ height: "20px", width: "10px" }}> </div>
                )}
              </div>

              <div className="input-label">
                <label>Votre nom</label>
                <Field name="lastName" placeholder="Nom" />
                {errors.lastName && touched.lastName ? (
                  <div style={{ color: "red" }}>{errors.lastName}</div>
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

export default InfoContainer;
