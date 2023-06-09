import { PaymentFormData, Invoices } from "../Interfaces";

export interface RegisterDataType {
  email: string;
  firstName: string;
  lastName: string;
  invoices: Invoices[];
  password: string;
}
