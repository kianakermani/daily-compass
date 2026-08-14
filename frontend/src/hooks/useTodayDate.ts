import { useEffect, useState } from "react";
import { formatLocalDate, scheduleAtMidnight } from "../utils/dates";

export function useTodayDate(): string {
  const [today, setToday] = useState(() => formatLocalDate());

  useEffect(() => {
    const syncToday = () => {
      const current = formatLocalDate();

      setToday((prev) => (prev !== current ? current : prev));
    };

    const cancelMidnightTimer = scheduleAtMidnight(syncToday);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncToday();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelMidnightTimer();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return today;
}
