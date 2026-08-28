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

type StoredCheckinData = Omit<
  Partial<CheckinData>,
  "habits" | "mainMood" | "physicalStates" | "mentalStates" | "sleepQuality"
> & {
  habits?: unknown;
  mainMood?: unknown;
  physicalStates?: unknown;
  mentalStates?: unknown;
  sleepQuality?: unknown;
  isStressed?: unknown;
  isTired?: unknown;
};

export function saveCheckin(data: CheckinData) {
  const checkins: CheckinData[] = JSON.parse(
    localStorage.getItem("checkins") || "[]",
  );

  const idx = checkins.findIndex((c) => c.date === data.date);

  if (idx >= 0) {
    checkins[idx] = data;
  } else {
    checkins.push(data);
  }

  localStorage.setItem("checkins", JSON.stringify(checkins));
  localStorage.setItem(`checkin-${data.date}`, JSON.stringify(data));
}

export function loadTodayCheckin(today: string): CheckinData | null {
  const saved = localStorage.getItem(`checkin-${today}`);

  if (!saved) return null;

  try {
    const parsed = JSON.parse(saved);
    
    // Migration logic for old data format
    return migrateOldDataFormat(parsed);
  } catch (error) {
    console.error("Error parsing saved check-in data:", error);
    return null;
  }
}

function migrateOldDataFormat(data: StoredCheckinData): CheckinData {
  const habits = normalizeHabits(data.habits);

  // If data already has new fields, return as is
  if (data.physicalStates !== undefined && data.mentalStates !== undefined && data.sleepQuality !== undefined) {
    return { ...data, habits } as CheckinData;
  }

  // Migrate from old format to new format
  const migrated: StoredCheckinData & {
    habits: CheckinData["habits"];
    physicalStates: string[];
    mentalStates: string[];
    sleepQuality: CheckinData["sleepQuality"];
  } = {
    ...data,
    habits,
    physicalStates: [],
    mentalStates: [],
    sleepQuality: null,
  };

  // Handle migration of isStressed and isTired
  if (data.isStressed !== undefined) {
    if (data.isStressed) {
      migrated.mentalStates = ["stressed"];
    }
  }

  if (data.isTired !== undefined) {
    if (data.isTired) {
      migrated.physicalStates = ["tired"];
    }
  }

  // Clean up old fields
  if (migrated.isStressed !== undefined) {
    delete migrated.isStressed;
  }
  if (migrated.isTired !== undefined) {
    delete migrated.isTired;
  }

  // Make sure mainMood doesn't contain energetic (should be in physicalStates)
  if (migrated.mainMood && Array.isArray(migrated.mainMood)) {
    const energeticIndex = migrated.mainMood.indexOf("energetic");
    if (energeticIndex !== -1) {
      migrated.mainMood = migrated.mainMood.filter(
        (mood: unknown) => mood !== "energetic",
      );
      if (!migrated.physicalStates.includes("energized")) {
        migrated.physicalStates.push("energized");
      }
    }
  }

  return migrated as CheckinData;
}
