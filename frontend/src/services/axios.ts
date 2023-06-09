import axios from "axios";

const baseURLBackend = "http://localhost:4000";
const formatUrl = (url: string) => `${baseURLBackend}/${url}`;
const headers = { headers: {} };

// TODO : update data and token type

class AxiosCallApi {
  static get(url: string) {
    return axios.get(formatUrl(url), headers);
  }

  static post<T>(url: string, data: T) {
    return axios.post(formatUrl(url), data, headers);
  }

  static delete(url: string) {
    return axios.delete(formatUrl(url), headers);
  }

  static put<T>(url: string, data: T) {
    return axios.put(formatUrl(url), data, headers);
  }

  static patch<T>(url: string, data: T) {
    return axios.patch(formatUrl(url), data, headers);
  }

  static saveToken(token: any) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

export default AxiosCallApi;
