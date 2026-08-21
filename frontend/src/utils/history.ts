import type { CheckinData } from "../types";

function validateAndFixCheckin(checkin: any): CheckinData | null {
  if (!checkin || typeof checkin !== "object") {
    return null;
  }

  // Ensure all required fields exist with defaults
  return {
    date: checkin.date || new Date().toISOString().split('T')[0],
    moodScore: typeof checkin.moodScore === "number" ? checkin.moodScore : 5,
    mainMood: Array.isArray(checkin.mainMood) ? checkin.mainMood : [],
    physicalStates: Array.isArray(checkin.physicalStates) ? checkin.physicalStates : [],
    mentalStates: Array.isArray(checkin.mentalStates) ? checkin.mentalStates : [],
    sleepQuality: checkin.sleepQuality || null,
    habits: checkin.habits || {
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
    spending: checkin.spending || {
      amount: "0",
      currency: "USD",
      type: [],
      categories: "",
      financialMood: "",
    },
    bestPart: checkin.bestPart || "",
    worstPart: checkin.worstPart || "",
    notes: checkin.notes || "",
  };
}

export function loadCheckins(): CheckinData[] {
  try {
    const saved = localStorage.getItem("checkins");

    if (!saved) return [];

    const data = JSON.parse(saved);

    // Validate that we got an array
    if (!Array.isArray(data)) {
      console.error("Checkins data is not an array:", data);
      return [];
    }

    // Validate and fix each checkin
    const validatedData = data
      .map(validateAndFixCheckin)
      .filter((checkin): checkin is CheckinData => checkin !== null);

    return validatedData.sort(
      (a, b) => {
        try {
          const dateA = a?.date ? new Date(a.date).getTime() : 0;
          const dateB = b?.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA;
        } catch (error) {
          return 0;
        }
      },
    );
  } catch (error) {
    console.error("Error loading checkins:", error);
    return [];
  }
}
