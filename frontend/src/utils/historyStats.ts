import { Calendar, Smile, TrendingUp } from "lucide-react";
import type { CheckinData } from "../types";

export function getHistoryStats(checkins: CheckinData[]) {
  const chartData = [...checkins].reverse().map((c) => ({
    date: new Date(c.date + "T12:00:00").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    mood: c.moodScore,
  }));

  const avgMood =
    checkins.length > 0
      ? (
          checkins.reduce((sum, c) => sum + c.moodScore, 0) / checkins.length
        ).toFixed(1)
      : "—";

  const habitPct =
    checkins.length > 0
      ? Math.round(
          (checkins.reduce(
            (sum, c) => sum + Object.values(c.habits).filter(Boolean).length,
            0,
          ) /
            (checkins.length * 4)) *
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
