import type { CheckinData } from "../types";

export function loadCheckins(): CheckinData[] {
  const saved = localStorage.getItem("checkins");

  if (!saved) return [];

  const data: CheckinData[] = JSON.parse(saved);

  return data.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
