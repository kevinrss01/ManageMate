import axios from "axios";

const baseURLBackend = "http://localhost:4000";
const formatUrl = (url: string) => `${baseURLBackend}/${url}`;
const defaultHeaders = { headers: {} };

interface Headers {
  headers: { [key: string]: string | number | undefined };
}

// TODO : update data and token type

class AxiosCallApi {
  static async get<T>(url: string, headers?: Headers): Promise<T> {
    const response = await axios.get<T>(
      formatUrl(url),
      headers ? headers : defaultHeaders
    );
    return response.data;
  }

  static async post<T>(url: string, data: T, headers?: Headers) {
    const response = await axios.post(
      formatUrl(url),
      data,
      headers ? headers : defaultHeaders
    );
    return response.data;
  }

  static async delete(url: string, headers?: Headers) {
    const response = await axios.delete(
      formatUrl(url),
      headers ? headers : defaultHeaders
    );
    return response.data;
  }

  static async put<T>(url: string, data: T, headers: Headers) {
    try {
      const response = await axios.put(formatUrl(url), data, headers);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async patch<T>(url: string, data: T) {
    const response = await axios.patch(formatUrl(url), data, defaultHeaders);
    return response.data;
  }

  static saveToken(token: any) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

export default AxiosCallApi;
