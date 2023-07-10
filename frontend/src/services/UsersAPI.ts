import AxiosCallApi from "./axios";
import { UserState } from "@/interfaces/Interfaces";

const PREFIX = "users";
const formatSuffix = (suffix: string) => `${PREFIX}/${suffix}`;

class UsersAPI {
  static async getAllData(id: string, accessToken: string): Promise<UserState> {
    console.log(accessToken);
    return AxiosCallApi.get<UserState>(formatSuffix(`all-info/${id}`), {
      headers: { Authorization: accessToken },
    });
  }
}

export default UsersAPI;
