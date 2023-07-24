import { Field, Form, Formik } from "formik";
import { verificationUpdateInfoSchema } from "@/utils/yupShema";
import React from "react";
import { ComponentPropsUserPage } from "@/interfaces/UserPage";
import { ClipLoader } from "react-spinners";

const InfoContainer: React.FC<ComponentPropsUserPage> = ({
  userData,
  onSubmit,
  isLoading,
  typeOfDataFetching,
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
                <Field
                  name="firstName"
                  placeholder="Prénom"
                  autoComplete="off"
                />
                {errors.firstName && touched.firstName ? (
                  <div style={{ color: "red" }}>{errors.firstName}</div>
                ) : (
                  <div style={{ height: "20px", width: "10px" }}> </div>
                )}
              </div>

              <div className="input-label">
                <label>Votre nom</label>
                <Field name="lastName" placeholder="Nom" autoComplete="off" />
                {errors.lastName && touched.lastName ? (
                  <div style={{ color: "red" }}>{errors.lastName}</div>
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
              {isLoading && typeOfDataFetching === "names" ? (
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

export default InfoContainer;
