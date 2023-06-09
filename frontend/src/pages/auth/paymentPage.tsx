import PaymentForm from "@/components/auth/PaymentForm";
import { PaymentFormData, Invoices } from "@/interfaces/Interfaces";
import { RegisterDataType } from "@/interfaces/auth/AuthType";
import { v4 as uuidv4 } from "uuid";
import toastMessage from "@/utils/toast";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import AuthAPI from "@/services/AuthAPI";
import { ColorRing } from "react-loader-spinner";

loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    : ""
);

export const saveUserDataInSessionStorage = (values: PaymentFormData) => {
  try {
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
      invoices: [
        {
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
        },
      ],
      password: password,
    };

    sessionStorage.setItem("userData", JSON.stringify(data));
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

export default function PaymentPage() {
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);
  const [invoiceDataSaved, setInvoiceDataSaved] = useState<Boolean>(false);

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

  const handleSuccessPayment = async () => {
    setIsLoaded(true);
    toastMessage(
      "Le paiement a été effectué avec succès. Vous allez être redirigé",
      "success"
    );

    const userData = sessionStorage.getItem("userData");

    if (!userData) {
      toastMessage(
        "Aucune donnée utilisateur trouvée, veuillez nous contacter.",
        "error"
      );
      setIsLoaded(false);
      return;
    }

    const userDataParse = JSON.parse(userData);
    await AuthAPI.register(userDataParse)
      .then(() => {
        router.push("/app/homepage?success=true");
      })
      .catch((error) => {
        console.error(error);
        toastMessage(
          "Une erreur est survenue lors de la création de votre compte, veuillez nous contacter.",
          "error"
        );
        setIsLoaded(false);
      });
  };

  const registerFacturationData = async (data: PaymentFormData) => {
    saveUserDataInSessionStorage(data);
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
          <PaymentForm onSubmitFunction={registerFacturationData} />
          <div className="summary-container">
            <h2>Récapitulatif</h2>
            <div className="summary">
              <p>
                Vous allez achetez 20 GO de stockage pour <b>20 euros</b>{" "}
              </p>
            </div>
          </div>
        </div>
        <form action="/api/checkout_sessions" method="POST">
          <section>
            <button
              type="submit"
              role="link"
              className="update-button"
              style={{
                width: "auto",
                padding: "10px",
                textAlign: "center",
                marginTop: "20px",
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
