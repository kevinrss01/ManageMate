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
    try {
      const response = await axios.get<T>(
        formatUrl(url),
        headers ? headers : defaultHeaders
      );
      return response.data;
    } catch (error: any) {
      console.error(error?.response ? error.response?.data?.message : error);
      throw new Error(error);
    }
  }

  static async post<T>(url: string, data: T, headers?: Headers) {
    try {
      const response = await axios.post(
        formatUrl(url),
        data,
        headers ? headers : defaultHeaders
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.data?.errors) {
        console.error(error?.response?.data?.errors);
      } else {
        console.error(error?.response ? error.response?.data?.message : error);
      }

      throw new Error(error);
    }
  }

  static async delete(url: string, headers?: Headers) {
    try {
      const response = await axios.delete(
        formatUrl(url),
        headers ? headers : defaultHeaders
      );
      return response.data;
    } catch (error: any) {
      console.error(error?.response ? error.response?.data?.message : error);
      throw new Error(error);
    }
  }

  static async put<T>(url: string, data: T, headers: Headers) {
    try {
      const response = await axios.put(formatUrl(url), data, headers);
      return response.data;
    } catch (error: any) {
      console.error(error?.response ? error.response?.data?.message : error);
      throw new Error(error);
    }
  }

  static async patch<T>(url: string, data: T) {
    try {
      const response = await axios.patch(formatUrl(url), data, defaultHeaders);
      return response.data;
    } catch (error: any) {
      console.error(error?.response ? error.response?.data?.message : error);
      throw new Error(error);
    }
  }

  static saveToken(token: any) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

export default AxiosCallApi;
