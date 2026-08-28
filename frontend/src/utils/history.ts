import type { CheckinData } from "../types";

const defaultHabits: CheckinData["habits"] = {
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
};

function normalizeHabits(habits: unknown): CheckinData["habits"] {
  return {
    ...defaultHabits,
    ...(habits && typeof habits === "object" ? habits : {}),
  };
}

function validateAndFixCheckin(checkin: unknown): CheckinData | null {
  if (!checkin || typeof checkin !== "object") {
    return null;
  }

  const savedCheckin = checkin as Partial<CheckinData> & { habits?: unknown };

  // Ensure all required fields exist with defaults
  return {
    date: savedCheckin.date || new Date().toISOString().split("T")[0],
    moodScore:
      typeof savedCheckin.moodScore === "number" ? savedCheckin.moodScore : 5,
    mainMood: Array.isArray(savedCheckin.mainMood)
      ? savedCheckin.mainMood
      : [],
    physicalStates: Array.isArray(savedCheckin.physicalStates)
      ? savedCheckin.physicalStates
      : [],
    mentalStates: Array.isArray(savedCheckin.mentalStates)
      ? savedCheckin.mentalStates
      : [],
    sleepQuality: savedCheckin.sleepQuality || null,
    habits: normalizeHabits(savedCheckin.habits),
    spending: savedCheckin.spending || {
      amount: "0",
      currency: "USD",
      type: [],
      categories: "",
      financialMood: "",
    },
    bestPart: savedCheckin.bestPart || "",
    worstPart: savedCheckin.worstPart || "",
    notes: savedCheckin.notes || "",
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
        } catch {
          return 0;
        }
      },
    );
  } catch (error) {
    console.error("Error loading checkins:", error);
    return [];
  }
}

export function deleteCheckin(date: string): CheckinData[] {
  const updatedCheckins = loadCheckins().filter((checkin) => checkin.date !== date);

  localStorage.setItem("checkins", JSON.stringify(updatedCheckins));
  localStorage.removeItem(`checkin-${date}`);

  return updatedCheckins;
}

export function clearCheckinHistory() {
  const checkinKeys = Object.keys(localStorage).filter(
    (key) => key === "checkins" || key.startsWith("checkin-"),
  );

  checkinKeys.forEach((key) => localStorage.removeItem(key));
}
