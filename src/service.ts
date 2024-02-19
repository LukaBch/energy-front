import { AxiosRequestConfig } from 'axios';
import apiCall from './tools/apiCall';

export async function getMinimalTotalEnergyConsumption(
  selectedAppliances: number[]
): Promise<any> {
  const options: AxiosRequestConfig = {
    method: 'POST',
    data: { selected_appliances: selectedAppliances }
  };

  return apiCall<any>(
    "min",
    options
  ).then((result: any) => result.data);
}

export async function getEnergyConsumptions(
  selectedAppliances: number[],
  totalConsumption: string
): Promise<any> {
  const options: AxiosRequestConfig = {
    method: 'POST',
    data: { selected_appliances: selectedAppliances, total_consumption: totalConsumption }
  };

  return apiCall<any>(
    "energyconsumptions",
    options
  ).then((result: any) => result.data);
}

