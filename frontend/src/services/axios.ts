import axios from "axios";
import { AxiosResponse } from "axios";

const baseURLBackend = "http://localhost:4000";
const formatUrl = (url: string) => `${baseURLBackend}/${url}`;
const headers = { headers: {} };

// TODO : update data and token type

class AxiosCallApi {
  static async get<T>(url: string) {
    const response = await axios.get<T>(formatUrl(url), headers);
    return response.data;
  }

  static async post<T>(url: string, data: T) {
    const reponse = await axios.post(formatUrl(url), data, headers);
    return reponse.data;
  }

  static async delete(url: string) {
    const response = await axios.delete(formatUrl(url), headers);
    return response.data;
  }

  static async put<T>(url: string, data: T) {
    const response = await axios.put(formatUrl(url), data, headers);
    return response.data;
  }

  static async patch<T>(url: string, data: T) {
    const response = await axios.patch(formatUrl(url), data, headers);
    return response.data;
  }

  static saveToken(token: any) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

export default AxiosCallApi;
