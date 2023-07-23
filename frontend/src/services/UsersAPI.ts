import AxiosCallApi from "./axios";
import { UserState } from "@/interfaces/Interfaces";

const PREFIX = "users";
const formatSuffix = (suffix: string) => `${PREFIX}/${suffix}`;

class UsersAPI {
  static async getAllData(id: string, accessToken: string): Promise<UserState> {
    return AxiosCallApi.get<UserState>(formatSuffix(`all-info/${id}`), {
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
}

export default UsersAPI;
