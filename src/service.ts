import { AxiosRequestConfig } from 'axios';
import apiCall from './apiCall';
import { AppliancesAndBoundariesApi, EnergyConsumptionsApi } from './types';

export async function getAppliancesAndBoundaries(): Promise<AppliancesAndBoundariesApi> {
  const options: AxiosRequestConfig = {
    method: 'GET',
  };

  return apiCall<AppliancesAndBoundariesApi>(
    "appliances-and-boundaries",
    options
  ).then(result => result.data);
}

export async function getMinimalTotalEnergyConsumption(
  selectedAppliances: number[]
): Promise<string> {
  const options: AxiosRequestConfig = {
    method: 'POST',
    data: { selected_appliances: selectedAppliances }
  };

  return apiCall<string>(
    "min",
    options
  ).then(result => result.data);
}

export async function getEnergyConsumptions(
  selectedAppliances: number[],
  totalConsumption: string
): Promise<EnergyConsumptionsApi> {
  const options: AxiosRequestConfig = {
    method: 'POST',
    data: { selected_appliances: selectedAppliances, total_consumption: totalConsumption }
  };

  return apiCall<EnergyConsumptionsApi>(
    "energyconsumptions",
    options
  ).then(result => result.data);
}

