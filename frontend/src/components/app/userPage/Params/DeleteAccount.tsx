import { Button, Callout } from "@tremor/react";
import React, { useState } from "react";
import { GrAlert } from "react-icons/gr";
import { simplePasswordSchema } from "@/utils/yupShema";
import { Field, Form, Formik } from "formik";
import { ComponentPropsUserPage } from "@/interfaces/UserPage";
import toastMessage from "@/utils/toast";
import AuthAPI from "@/services/AuthAPI";
import { useRouter } from "next/navigation";
import { emailJSData } from "@/utils/constant";
import emailjs from "@emailjs/browser";
import { createFormFromObject } from "@/pages/auth/paymentPage";

export const DeleteAccount: React.FC<ComponentPropsUserPage> = ({
  userData,
}) => {
  const [onClickFirstDeleteButton, setOnClickFirstDeleteButton] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { serviceId, templateId, publicKey } = emailJSData;

  const onSubmit = async (values: { password: string }) => {
    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (!token)
      return toastMessage(
        "Nous n'avons pas réussi à vous identifier, veuillez vous reconnecter et réessayer",
        "error"
      );

    try {
      AuthAPI.login(userData.email, values.password)
        .then(async () => {
          await AuthAPI.deleteAccount(token);

          localStorage.removeItem("token");
          localStorage.removeItem("id");

          const formElement = createFormFromObject({
            subject: "Votre compte Manage Mate a bien été supprimé",
            user_email: userData.email,
            user_name: userData.firstName,
            message:
              "Votre compte et toutes vos données ont bien été définitivement supprimé. Si vous souhaitez de nouveau avoir accès à Manage Mate, vous devez de nouveau créer un compte. ",
          });

          emailjs
            .sendForm(serviceId, templateId, formElement, publicKey)
            .then(
              (result) => {
                console.log(result.text);
              },
              (error) => {
                console.error(error.text);
              }
            )
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              document.body.removeChild(formElement);
            });
          router.push("/?deletedAccount=true");
        })
        .catch((err) => {
          console.error(err);
          if (err.toString().includes("401")) {
            toastMessage("Mot de passe incorrect", "error");
          } else {
            toastMessage(
              "Une erreur est survenue lors de la suppression de votre compte, veuillez réessayer plus tard.",
              "error"
            );
          }
        });
    } catch (err) {
      toastMessage(
        "Une erreur est survenue lors de la suppression de votre compte, veuillez réessayer plus tard.",
        "error"
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="delete-account-container flex items-center flex-col ">
      <h3 className="">Supprimer mon compte</h3>

      {onClickFirstDeleteButton ? (
        <>
          <Callout
            className=""
            title="Suppression de compte irréversible"
            icon={GrAlert}
            color="rose"
          >
            Si vous supprimez votre compte, toutes vos données seront supprimées
            et vous ne pourrez plus accéder à votre compte. Voulez-vous vraiment
            supprimer votre compte ?
            <Formik
              initialValues={{
                password: "",
              }}
              validationSchema={simplePasswordSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="input-container-password input-container mt-6">
                    <div className="input-label">
                      <Field
                        name="password"
                        placeholder="Entrez votre mot de passe pour confirmer"
                        type="password"
                        autoComplete="off"
                      />
                      {errors.password && touched.password ? (
                        <div style={{ color: "red" }}>{errors.password}</div>
                      ) : (
                        <div style={{ height: "20px", width: "10px" }}> </div>
                      )}
                    </div>
                  </div>

                  <Button className="mt-2" type="submit" loading={isLoading}>
                    Oui, je veux supprimer mon compte
                  </Button>
                </Form>
              )}
            </Formik>
          </Callout>
        </>
      ) : (
        <>
          <Button onClick={() => setOnClickFirstDeleteButton(true)}>
            Supprimer mon compte ?
          </Button>
        </>
      )}
    </div>
  );
};
