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