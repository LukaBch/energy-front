export type Appliance = {
  id: number;
  category: "F" | "A" | "L",
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