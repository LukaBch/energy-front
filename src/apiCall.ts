import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
});

const apiCall = async <T>(
  endpoint: string,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => {
  const url = `api/${endpoint}`;

  try {
    const response = await axiosInstance<T>(url, config);
    return response;
  } catch (error) {
    console.error('Error making API call:', error);
    throw error;
  }
};

export default apiCall;