import type { CheckinData } from "../types";

export function createDefaultCheckinData(date: string): CheckinData {
  return {
    date,
    moodScore: 5,
    mainMood: [],
    isStressed: false,
    isTired: false,
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
    },
    spending: {
      amount: "",
      type: "",
      financialMood: "",
    },
    bestPart: "",
    worstPart: "",
    notes: "",
  };
}
