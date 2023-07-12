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
    return AxiosCallApi.put(
      formatSuffix("updateUserNames"),
      { userId: id, firstName, lastName },
      { headers: { Authorization: accessToken } }
    );
  }
}

export default UsersAPI;
