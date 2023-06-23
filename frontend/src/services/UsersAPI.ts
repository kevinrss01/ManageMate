import AxiosCallApi from "./axios";
import { UserState } from "@/interfaces/Interfaces";

const PREFIX = "users";
const formatSuffix = (suffix: string) => `${PREFIX}/${suffix}`;

class UsersAPI {
  static async getAllData(id: string): Promise<UserState> {
    return AxiosCallApi.get<UserState>(formatSuffix(`all-info/${id}`));
  }
}

export default UsersAPI;
