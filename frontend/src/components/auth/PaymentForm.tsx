import { paymentSchema } from "@/utils/yupShema";
import { Field, Form, Formik } from "formik";
import { FunctionComponent } from "react";
import { PaymentFormData } from "@/interfaces/Interfaces";
import { FcApproval } from "react-icons/fc";
import { useState } from "react";

interface InputField {
  name: string;
  placeholder: string;
}

interface PaymentFormProps {
  onSubmitFunction: (values: PaymentFormData) => void;
}

const PaymentForm: FunctionComponent<PaymentFormProps> = ({
  onSubmitFunction,
}) => {
  const inputFields: InputField[] = [
    {
      name: "firstName",
      placeholder: "Prénom",
    },
    {
      name: "lastName",
      placeholder: "Nom de famille",
    },
    {
      name: "company",
      placeholder: "Nom de l'entreprise",
    },
    {
      name: "address",
      placeholder: "Adresse",
    },
    {
      name: "postalCode",
      placeholder: "Code postal",
    },
    {
      name: "city",
      placeholder: "Ville",
    },
    {
      name: "country",
      placeholder: "Pays",
    },
  ];

  return (
    <div className="facturation-form-container">
      <h2>Informations de facturation</h2>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          company: "",
          address: "",
          postalCode: "",
          city: "",
          country: "",
        }}
        validationSchema={paymentSchema}
        onSubmit={(values) => {
          onSubmitFunction(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            {inputFields.map((inputField) => {
              return (
                <>
                  <Field
                    name={inputField.name}
                    placeholder={inputField.placeholder}
                  />
                  {/* @ts-ignore */}
                  {errors[inputField.name] && touched[inputField.name] ? (
                    <span className="error-message">
                      {/* @ts-ignore */}
                      {errors[inputField.name]}
                    </span>
                  ) : null}
                </>
              );
            })}
            <button type="submit" className="update-button" onClick={() => {}}>
              Enregistrer
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentForm;
