import AxiosCallApi from "./axios";
import { RegisterDataType } from "@/interfaces/auth/AuthType";

const PREFIX = "auth";
const formatSuffix = (suffix: string) => `${PREFIX}/${suffix}`;

interface verifyTokenResponse {
  decodedToken: {
    userId: string;
    role: "admin" | "user";
    iat: number;
    exp: number;
  };
}

class AuthAPI {
  static async register(formValue: RegisterDataType) {
    return AxiosCallApi.post(formatSuffix("register"), formValue);
  }

  static async verifyIfEmailExists(email: string) {
    return AxiosCallApi.post<{ email: string }>(formatSuffix(`verifyEmail`), {
      email: email,
    });
  }

  static async login(email: string, password: string) {
    return AxiosCallApi.post<{ email: string; password: string }>(
      formatSuffix("login"),
      {
        email: email,
        password: password,
      }
    );
  }

  static async logout() {
    return AxiosCallApi.get(formatSuffix("logout"));
  }
  static async deleteAccount(token: string) {
    return AxiosCallApi.delete(formatSuffix("deleteAccount"), {
      headers: { authorization: token },
    });
  }

  static async verifyToken(token: string) {
    return AxiosCallApi.get<verifyTokenResponse>(formatSuffix("verifyToken"), {
      headers: { authorization: token },
    });
  }
}

export default AuthAPI;
