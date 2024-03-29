import PaymentForm from "@/components/auth/PaymentForm";
import { PaymentFormData, Invoices } from "@/interfaces/Interfaces";
import { RegisterDataType } from "@/interfaces/auth/AuthType";
import { v4 as uuidv4 } from "uuid";
import toastMessage from "@/utils/toast";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import AuthAPI from "@/services/AuthAPI";
import UsersAPI from "@/services/UsersAPI";
import { ColorRing } from "react-loader-spinner";
import emailjs from "@emailjs/browser";
import { emailJSData } from "@/utils/constant";

loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    : ""
);

export const saveUserDataInSessionStorage = (
  values: PaymentFormData,
  newStorage: Boolean
) => {
  try {
    const invoices: Invoices = {
      id: uuidv4(),
      billAddress: {
        firstName: values.firstName,
        lastName: values.lastName,
        company: values.company,
        address: values.address,
        postalCode: values.postalCode,
        city: values.city,
        country: values.country,
      },
      totalAmount: 20,
      totalStorage: "20 GO",
      paymentMethod: "cb",
      paymentDate: new Date().toLocaleDateString("fr-FR"),
    };

    if (newStorage) {
      sessionStorage.setItem("userData", JSON.stringify(invoices));
    } else {
      const primaryRegisterData = sessionStorage.getItem("registerData");
      if (!primaryRegisterData) {
        throw new Error("No primary register data");
      }
      const { email, firstName, lastName, password } =
        JSON.parse(primaryRegisterData);

      const data: RegisterDataType = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        invoices: [invoices],
        password: password,
      };

      sessionStorage.setItem("userData", JSON.stringify(data));
    }

    toastMessage("Vos données de facturation ont été enregistrées.", "success");
  } catch (error: any) {
    console.error(error);
    if (error.message === "No primary register data") {
      toastMessage(
        "Il semblerais que toutes les informations n'ont pas été renseignées. Veuillez réessayer, ou changer de navigateur.",
        "error"
      );
    } else {
      toastMessage(
        "Une erreur est survenue. Veuillez réessayer plus tard.",
        "error"
      );
    }
  }
};

export const createFormFromObject = (obj: {
  subject: string;
  user_name: string;
  message: string;
  user_email: string;
}) => {
  const form = document.createElement("form");
  form.style.display = "none";

  for (const [key, value] of Object.entries(obj)) {
    const input = document.createElement("input");
    input.name = key;
    input.value = value as string;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  return form;
};

export default function PaymentPage() {
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);
  const [invoiceDataSaved, setInvoiceDataSaved] = useState<Boolean>(false);
  const { serviceId, templateId, publicKey } = emailJSData;

  const router = useRouter();
  const { canceled, success } = router.query;

  useEffect(() => {
    if (canceled) {
      toastMessage("Le paiement a été annulé, veuillez réessayer.", "error");
      return;
    }

    if (success) {
      handleSuccessPayment();
    }
  }, [canceled, success]);

  const createNewCustomer = async (userDataParse: RegisterDataType) => {
    await AuthAPI.register(userDataParse)
      .then((res) => {
        localStorage.setItem("id", res.id);
        localStorage.setItem("token", res.accessToken);
        router.push(`/app/homepage?success=true`);
      })
      .catch((error) => {
        console.error(error);
        toastMessage(
          "Une erreur est survenue lors de la création de votre compte, veuillez nous contacter.",
          "error"
        );
      });
  };

  const addNewStorage = async (invoices: Invoices) => {
    try {
      const userData = sessionStorage.getItem("userData");
      const userId = localStorage.getItem("id");
      const accessToken = localStorage.getItem("token");

      if (!userData || !userId || !accessToken) {
        toastMessage(
          "Aucune donnée utilisateur trouvée, veuillez nous contacter.",
          "error"
        );
        console.error("No id or no token or no userData in localStorage");
        return;
      }

      await UsersAPI.addStorage(userId, invoices, accessToken);
      router.push(`/app/homepage`);
    } catch (error) {
      console.error(error);
      toastMessage(
        "Une erreur est survenue lors de l'ajout de votre stockage, veuillez nous contacter.",
        "error"
      );
    }
  };

  const handleSuccessPayment = async () => {
    try {
      setIsLoaded(true);
      const accessToken = localStorage.getItem("token");
      const userData = sessionStorage.getItem("userData");

      if (!userData) {
        toastMessage(
          "Aucune donnée utilisateur trouvée, veuillez nous contacter.",
          "error"
        );
        setIsLoaded(false);
        return;
      }

      const dataForEmail = {
        subject: "Bienvenue chez Manage Mate " + JSON.parse(userData).firstName,
        user_name: JSON.parse(userData).firstName,
        message:
          "Bienvenue chez Manage Mate, votre stockage est maintenant actif ! Merci de nous avoir choisi et n'hésiter pas à nous contacter pour toutes questions.",
        user_email: JSON.parse(userData).email,
      };

      const formElement = createFormFromObject(dataForEmail);
      const userDataParse: RegisterDataType | Invoices = JSON.parse(userData);

      toastMessage(
        "Le paiement a été effectué avec succès. Vous allez être redirigé",
        "success"
      );

      if (accessToken) {
        await addNewStorage(userDataParse as Invoices);
      } else {
        await createNewCustomer(userDataParse as RegisterDataType);
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
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoaded(false);
    }
  };

  const registerFacturationData = async (data: PaymentFormData) => {
    const accessToken = localStorage.getItem("token");

    saveUserDataInSessionStorage(data, !!accessToken);
    setInvoiceDataSaved(true);
  };

  return (
    <div className="payment-page-container">
      <h1>Page de Paiement</h1>
      {isLoaded && (
        <>
          <ColorRing
            visible={true}
            height="120"
            width="120"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </>
      )}
      <div
        className="body"
        style={{
          filter: isLoaded ? "blur(5px)" : "blur(0px)",
          pointerEvents: isLoaded ? "none" : "auto",
        }}
      >
        <div className="form-and-summary-container">
          <div className="summary-container">
            <h2>Récapitulatif : </h2>
            <div className="summary">
              <p>
                Vous allez achetez 20 GO de stockage sur ManageMate pour un
                total de <b>20 euros</b>.{" "}
              </p>
            </div>
          </div>
          <PaymentForm onSubmitFunction={registerFacturationData} />
        </div>
        <form
          action="/api/checkout_sessions"
          method="POST"
          className="pay-button-container"
        >
          <section>
            <span>
              Entrer <b>4242 4242 4242 4242</b> comme numéro de carte bancaire{" "}
              pour pour créer un faux paiement
            </span>
            <button
              type="submit"
              role="link"
              className="update-button"
              style={{
                pointerEvents: invoiceDataSaved ? "auto" : "none",
                opacity: invoiceDataSaved ? "1" : "0.5",
                cursor: invoiceDataSaved ? "pointer" : "not-allowed",
              }}
            >
              Payer le stockage et <br /> créer mon compte
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}
