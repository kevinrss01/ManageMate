import Image from "next/image";
import rocket from "../../../../public/images/rocket.png";
import { Formik, Form, Field } from "formik";
import { verificationUpdateInfoSchema } from "../../auth/yupShema";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../slices/userSlice";

export default function Params() {
  const userData = useSelector(selectUser);

  const onSubmit = (data: unknown): void => {
    console.log(data);
  };

  const initialValues = {
    firstName: userData.firstName || "", // Utilisez les valeurs de Redux si elles existent
    lastName: userData.lastName || "",
  };

  return (
    <div className="params-container">
      <div className="update-container">
        <div className="personal-info-container">
          <h3>Informations personnelles</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={verificationUpdateInfoSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="input-container">
                  <div className="input-label">
                    <Field name="firstName" placeholder="Prénom" />
                    {errors.firstName && touched.firstName ? (
                      <div style={{ color: "red" }}>{errors.firstName}</div>
                    ) : (
                      <div style={{ height: "20px", width: "10px" }}> </div>
                    )}
                  </div>

                  <div className="input-label">
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
        <div className="email-container">
          <h3>Changer son e-mail</h3>
        </div>
        <div className="password-container">
          <h3>Changer son mot de passe</h3>
        </div>
      </div>
      <div className="upgrade-container">
        <div className="upgrade-space-params">
          <Image src={rocket} className="rocketImage" alt="Image of a rocket" />
          <h3>Besoin de plus d'espace ?</h3>
          <div
            className="button-upgrade"
            onClick={() => {
              //
            }}
          >
            Augmenter
            <br /> Maintenant
          </div>
        </div>
      </div>
    </div>
  );
}
