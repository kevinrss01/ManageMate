import AxiosCallApi from "./axios";
import { UserState, UserStateWithId, Invoices } from "@/interfaces/Interfaces";

const PREFIX = "users";
const formatSuffix = (suffix: string) => `${PREFIX}/${suffix}`;

class UsersAPI {
  static async getAllData(id: string, accessToken: string): Promise<UserState> {
    return AxiosCallApi.get<UserState>(formatSuffix(`all-info/${id}`), {
      headers: { Authorization: accessToken },
    });
  }

  static async getAllUsers(accessToken: string): Promise<UserStateWithId[]> {
    return AxiosCallApi.get<UserStateWithId[]>(formatSuffix("allUsers"), {
      headers: { Authorization: accessToken },
    });
  }

  static async updateUserNames(
    id: string,
    firstName: string,
    lastName: string,
    accessToken: string
  ): Promise<any> {
    if (!firstName || !lastName || !id || !accessToken)
      throw new Error("Missing data");
    return AxiosCallApi.put(
      formatSuffix("updateUserNames"),
      { userId: id, firstName, lastName },
      { headers: { Authorization: accessToken } }
    );
  }

  static async updateUserEmail(
    id: string,
    email: string,
    accessToken: string
  ): Promise<any> {
    if (!email || !id || !accessToken) throw new Error("Missing data");
    return AxiosCallApi.put(
      formatSuffix("updateEmail"),
      { userId: id, email },
      { headers: { Authorization: accessToken } }
    );
  }

  static async updateUserPassword(
    userId: string,
    newPassword: string,
    accessToken: string
  ): Promise<any> {
    if (!newPassword || !userId || !accessToken)
      throw new Error("Missing data");
    return AxiosCallApi.put(
      formatSuffix("updatePassword"),
      { userId, password: newPassword },
      { headers: { Authorization: accessToken } }
    );
  }

  static async addStorage(
    userId: string,
    invoice: Invoices,
    accessToken: string
  ): Promise<any> {
    if (!userId || !invoice) throw new Error("Missing data");
    return AxiosCallApi.put(
      formatSuffix("addStorage"),
      { userId, invoice },
      { headers: { Authorization: accessToken } }
    );
  }
}

export default UsersAPI;
