export type Category = "F" | "A" | "L";

export type Appliance = {
  id: number;
  category: Category,
  name: string;
  power: number;
}

export type ComputedAppliance = {
  id: number;
  category: Category,
  name: string;
  power: number;
  selected: boolean;
  hours: string;
  energy: string;
  proportion: string;
}

export type EnergyConsumptionApi = {
  id: number;
  hours: string;
  energy: string;
  proportion: string;
}

export type EnergyConsumptionsApi = {
  total: number;
  energies: EnergyConsumptionApi[];
}

export type Boundaries = Record<Category, { min: number; max: number }>;

export type AppliancesAndBoundariesApi = {
  appliances: Appliance[];
  boundaries: Boundaries;
}