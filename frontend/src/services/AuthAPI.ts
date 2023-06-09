import AxiosCallApi from "./axios";
import { RegisterDataType } from "@/interfaces/auth/AuthType";

const PREFIX = "auth";
const formatSuffix = (suffix: string) => `${PREFIX}/${suffix}`;

class AuthAPI {
  static async register(formValue: RegisterDataType) {
    return AxiosCallApi.post(formatSuffix("register"), formValue);
  }

  static async verifyIfEmailExists(email: string) {
    console.log("email", email);
    return AxiosCallApi.post(formatSuffix(`verifyEmail`), { email: email });
  }
}

export default AuthAPI;
