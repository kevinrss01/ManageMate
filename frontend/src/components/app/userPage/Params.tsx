import Image from "next/image";
import rocket from "../../../../public/images/rocket.png";
import { Formik, Form, Field } from "formik";
import {
  verificationUpdateEmailSchema,
  verificationUpdateInfoSchema,
  verificationUpdatePasswordSchema,
} from "@/utils/yupShema";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../slices/userSlice";
import { useEffect, useState } from "react";
import {
  UpdateDataType,
  UpdatePasswordDataType,
} from "@/interfaces/Interfaces";
import { fetchUserData } from "@/pages/app/homepage";
import toastMessage from "@/utils/toast";

export default function Params() {
  const data = useSelector(selectUser);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [userData, setUserData] = useState(data);

  useEffect(() => {
    const fetchUser = async () => {
      if (userData.firstName === "") {
        const dataFetched = await fetchUserData();
        setUserData(dataFetched);
      }
    };
    fetchUser();
  }, []);

  const verifyIfPasswordMatch = (data: {
    oldPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
  }): boolean => {
    if (data.newPassword !== data.newPasswordConfirmation) {
      setErrorPassword(true);
      return false;
    } else {
      setErrorPassword(false);
      return true;
    }
  };

  const onSubmit = (data: UpdateDataType): void => {
    try {
      if (data.oldPassword) {
        if (!verifyIfPasswordMatch(data as UpdatePasswordDataType)) {
          throw new Error("Passwords don't match");
        }

        //Appel axios pour update le mot de passe
        return toastMessage("Mot de passe mis à jour avec succès !", "success");
      }

      if (data.newEmail) {
        if (data.newEmail === userData.email) {
          return toastMessage("Les valeurs doivent être différentes.", "error");
        }

        //TO DO : Appel axios pour update l'email
        //TO DO : Update le store redux
        return toastMessage("Email mis à jour avec succès !", "success");
      }

      //TO DO : Appel axios pour update l'email
      //TO DO : Update le store redux
      if (
        data.firstName === userData.firstName ||
        data.lastName === userData.lastName
      ) {
        return toastMessage("Les valeurs doivent être différentes.", "error");
      }
      toastMessage(`Nom et prénom mis à jour avec succès !`, "success");
      console.log(data);
    } catch (error: any) {
      toastMessage(
        "Oups ! Une erreur c'est produit veuillez réessayer plus tard.",
        "error"
      );
      console.log("Something went wrong: ", error.message);
      throw new Error("Something went wrong: ", error);
    }
  };

  const isUserDataFetched = !!userData.firstName;
  return (
    <div className="params-container">
      <div className="update-container">
        {isUserDataFetched && (
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
        )}

        {isUserDataFetched && (
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
        )}

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
                {errorPassword ? (
                  <div style={{ color: "red" }}>
                    Les deux mot de passe ne sont pas identiques
                  </div>
                ) : (
                  <> </>
                )}

                <button className="update-button" type="submit">
                  Modifier
                </button>
              </Form>
            )}
          </Formik>
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
