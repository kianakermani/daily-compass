import { useEffect, useState } from "react";

// Components
import Card from "../components/Card";

// Types
import type { CheckinData } from "../types";

// Constants
import { moodOptions } from "../constants/moodOptions";

// Icons
import { Calendar, Smile, TrendingUp } from "lucide-react";

// Charts
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, bg, iconColor, Icon }) => (
          <Card key={label} className="p-5 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div>
                <p className="text-2xl font-light text-slate-800">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {chartData.length > 0 && (
        <Card className="p-6 bg-white/80 backdrop-blur-sm">
          <h3 className="text-base font-medium text-slate-700 mb-4">
            Mood trend
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
              <YAxis domain={[1, 10]} stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={{ fill: "#6366f1", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      <div>
        <h3 className="text-base font-medium text-slate-700 mb-4">
          Recent check-ins
        </h3>
        <div className="space-y-3">
          {checkins.length === 0 ? (
            <Card className="p-10 bg-white/80 backdrop-blur-sm text-center">
              <p className="text-slate-400 text-sm">
                No check-ins yet. Start tracking today!
              </p>
            </Card>
          ) : (
            checkins.slice(0, 10).map((c) => {
              const MoodIcon =
                moodOptions.find((m) => m.value === c.mainMood)?.icon ?? Smile;
              return (
                <Card
                  key={c.date}
                  className="p-5 bg-white/80 backdrop-blur-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <MoodIcon className="w-6 h-6 text-indigo-600" />
                      </div>
                      <p className="text-xl font-light text-indigo-600">
                        {c.moodScore}
                      </p>
                      <p className="text-xs text-slate-400">
                        {new Date(c.date + "T12:00:00").toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {c.mainMood && (
                          <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-xs">
                            {c.mainMood}
                          </span>
                        )}
                        {c.isStressed && (
                          <span className="px-2.5 py-0.5 bg-red-50 text-red-600 rounded-full text-xs">
                            Stressed
                          </span>
                        )}
                        {c.isTired && (
                          <span className="px-2.5 py-0.5 bg-orange-50 text-orange-600 rounded-full text-xs">
                            Tired
                          </span>
                        )}
                      </div>
                      {c.bestPart && (
                        <p className="text-sm text-slate-600 line-clamp-2">
                          <span className="text-xs text-slate-400 mr-1">
                            Best:
                          </span>
                          {c.bestPart}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1.5">
                        {Object.entries(c.habits)
                          .filter(([, done]) => done)
                          .map(([habit]) => (
                            <span
                              key={habit}
                              className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs"
                            >
                              {habit}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
