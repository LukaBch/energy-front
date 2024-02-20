import { Category, Appliance } from "./types";

export default {
  categories: ["F", "A", "L"] as Category[],
  appliances: [
    { id: 1, category: "F", name: 'Fridge', "power": 2000 },
    { id: 2, category: "F", name: 'Freezer', "power": 2500 },
    { id: 3, category: "A", name: 'Washing machine', "power": 1500 },
    { id: 4, category: "A", name: 'Dishwasher', "power": 2500 },
    { id: 5, category: "A", name: 'Induction Stove', "power": 3000 },
    { id: 6, category: "L", name: 'TV', "power": 500 },
    { id: 7, category: "L", name: 'Small Light', "power": 100 },
    { id: 8, category: "L", name: 'Big Light', "power": 800 },
  ] as Appliance[],
  boundaries: {
    "F": {
      "min": 6,
      "max": 8
    },
    "A": {
      "min": 1,
      "max": 4
    },
    "L": {
      "min": 4,
      "max": 24
    }
  } as Record<Category, { min: number; max: number }>
}