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
      walking: false,
      reading: false,
      skincare: false,
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
