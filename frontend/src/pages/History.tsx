import { useEffect, useState } from "react";

import HistoryStats from "../components/history/HistoryStats";
import MoodChart from "../components/history/MoodChart";
import CheckinList from "../components/history/CheckinList";

// Types
import type { CheckinData } from "../types";

// Icons
import { Calendar, Smile, TrendingUp } from "lucide-react";

export default function History() {
  const [checkins, setCheckins] = useState<CheckinData[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("checkins");
    if (saved) {
      const data: CheckinData[] = JSON.parse(saved);
      data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setCheckins(data);
    }
  }, []);

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
          checkins.reduce((s, c) => s + c.moodScore, 0) / checkins.length
        ).toFixed(1)
      : "—";

  const habitPct =
    checkins.length > 0
      ? Math.round(
          (checkins.reduce(
            (s, c) => s + Object.values(c.habits).filter(Boolean).length,
            0,
          ) /
            (checkins.length * 4)) *
            100,
        )
      : 0;

  // Summary statistics
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium text-slate-800 mb-1">History</h2>

        <p className="text-sm text-slate-500">Your journey so far</p>
      </div>

      <HistoryStats stats={stats} />

      <MoodChart chartData={chartData} />

      <div>
        <h3 className="text-base font-medium text-slate-700 mb-4">
          Recent check-ins
        </h3>

        <CheckinList checkins={checkins} />
      </div>
    </div>
  );
}
