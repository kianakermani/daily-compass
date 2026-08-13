import type { CheckinData } from "../types";

export const habitLabels: Record<keyof CheckinData["habits"], string> = {
  water: "Water",
  healthyFood: "Healthy food",
  exercise: "Exercise",
  walking: "Walking",
  dancing: "Dancing",
  shower: "Shower",
  skincare: "Skincare",
  selfCare: "Self care",
  meditation: "Meditation",
  quietTime: "Quiet time",
  rest: "Rest",
  reading: "Reading",
  hobby: "Hobby",
  sleepEarly: "Sleep early",
};

export function formatCheckinDate(date: string) {
  return new Date(date + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
