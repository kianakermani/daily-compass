import type { CheckinData } from "../types";

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

  return JSON.parse(saved);
}
