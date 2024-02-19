import { AxiosRequestConfig } from 'axios';
import customAxios from './customAxios';

const apiCall = async <T>(
  endpoint: string,
  config: AxiosRequestConfig = {}
) => {
  const url = `http://localhost:8000/api/${endpoint}`;
  return customAxios<T>(url, config);
};

export default apiCall;