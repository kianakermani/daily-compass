import type { CheckinData } from "../types";

export function createDefaultCheckinData(date: string): CheckinData {
  return {
    date,
    moodScore: 5,
    mainMood: [],
    physicalStates: [],
    mentalStates: [],
    sleepQuality: null,
    habits: {
      water: false,
      healthyFood: false,
      exercise: false,
      walking: false,
      dancing: false,
      shower: false,
      skincare: false,
      selfCare: false,
      meditation: false,
      quietTime: false,
      rest: false,
      reading: false,
      hobby: false,
      sleepEarly: false,
      journaling: false,
      noScreenTime: false,
      stretching: false,
    },
    spending: {
      amount: "",
      currency: "TOMAN",
      type: [],
      categories: "",
      financialMood: "",
    },
    bestPart: "",
    worstPart: "",
    notes: "",
  };
}
