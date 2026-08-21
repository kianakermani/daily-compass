import { Calendar, Smile, TrendingUp } from "lucide-react";
import type { CheckinData } from "../types";

export function getHistoryStats(checkins: CheckinData[]) {
  // Handle invalid data gracefully
  if (!Array.isArray(checkins)) {
    checkins = [];
  }

  const chartData = [...checkins].reverse().map((c) => {
    try {
      const dateStr = c?.date;
      if (!dateStr) return { date: "Invalid date", mood: c?.moodScore || 0 };
      
      const date = new Date(dateStr + "T12:00:00");
      if (isNaN(date.getTime())) {
        return { date: "Invalid date", mood: c?.moodScore || 0 };
      }
      
      return {
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        mood: c?.moodScore || 0,
      };
    } catch (error) {
      return { date: "Error", mood: c?.moodScore || 0 };
    }
  });

  // Filter out invalid checkins for calculations
  const validCheckins = checkins.filter(
    (c) => c && typeof c.moodScore === "number" && !isNaN(c.moodScore)
  );

  const avgMood =
    validCheckins.length > 0
      ? (
          validCheckins.reduce((sum, c) => sum + c.moodScore, 0) / validCheckins.length
        ).toFixed(1)
      : "—";

  const habitCount = validCheckins[0] ? Object.keys(validCheckins[0].habits || {}).length : 0;

  const habitPct =
    validCheckins.length > 0 && habitCount > 0
      ? Math.round(
          (validCheckins.reduce(
            (sum, c) => sum + Object.values(c.habits || {}).filter(Boolean).length,
            0,
          ) /
            (validCheckins.length * habitCount)) *
            100,
        )
      : 0;

  const stats = [
    {
      label: "Total check-ins",
      value: checkins.length,
      bg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      Icon: Calendar,
    },
    {
      label: "Average mood",
      value: avgMood,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      Icon: Smile,
    },
    {
      label: "Habit completion",
      value: `${habitPct}%`,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      Icon: TrendingUp,
    },
  ];

  return {
    chartData,
    stats,
  };
}
