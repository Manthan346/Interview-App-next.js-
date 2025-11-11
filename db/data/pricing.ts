import { v4 as uuidv4 } from "uuid";

const currentDate: Date = new Date();

enum Experience {
  Fresher = "FRESHER",
  Senior = "SENIOR",
}

interface Pricing {
  id: string;
  experience: Experience;
  priceInPaise: number;
  createdAt: string;
  updatedAt: string;
}

export const pricing: Pricing[] = [
  {
    id: uuidv4(),
    experience: Experience.Fresher,
    priceInPaise: 60000,
    createdAt: currentDate.toISOString(),
    updatedAt: currentDate.toISOString(),
  },
  {
    id: uuidv4(),
    experience: Experience.Senior,
    priceInPaise: 150000,
    createdAt: currentDate.toISOString(),
    updatedAt: currentDate.toISOString(),
  },
];
