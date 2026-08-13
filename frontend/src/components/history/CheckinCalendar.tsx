import { useState } from "react";
import { Flame, ChevronLeft, ChevronRight } from "lucide-react";
import Card from "../Card";

import type { CheckinData } from "../../types";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function computeStreak(checkinDates: Set<string>): number {
  let streak = 0;
  const cursor = new Date();

  cursor.setHours(0, 0, 0, 0);

  while (true) {
    const key = formatLocalDate(cursor);

    if (!checkinDates.has(key)) break;

    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export default function CheckinCalendar({
  checkins,
}: {
  checkins: CheckinData[];
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const checkinDates = new Set(checkins.map((c) => c.date));
  const streak = computeStreak(checkinDates);

  const goBack = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const goForward = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    },
  );

  // Build the grid: first day of month offset (Mon=0)
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  // JS: 0=Sun,1=Monâ€¦6=Sat â†’ convert to Mon=0 offset
  const offset = (firstDay + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const todayStr = formatLocalDate(today);

  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // pad to full rows
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <Card className="p-5 bg-white/80 backdrop-blur-sm">
      {/* Header: title + streak */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-medium text-slate-700">
            Check-in calendar
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 text-justify">
            Days you showed up
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 rounded-xl px-3 py-1.5">
          <Flame
            className={`w-3.5 h-3.5 ${streak > 0 ? "text-orange-500" : "text-slate-300"}`}
          />
          <div className="text-right">
            <p
              className={`text-sm font-semibold leading-none ${streak > 0 ? "text-orange-600" : "text-slate-400"}`}
            >
              {streak} day{streak !== 1 ? "s" : ""}
            </p>
            <p
              className={`text-xs leading-none mt-0.5 ${streak > 0 ? "text-orange-400" : "text-slate-300"}`}
            >
              Current streak
            </p>
          </div>
        </div>
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={goBack}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-medium text-slate-600">{monthLabel}</span>
        <button
          onClick={goForward}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="text-center text-xs text-slate-400 font-medium py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;

          const mm = String(viewMonth + 1).padStart(2, "0");
          const dd = String(day).padStart(2, "0");
          const dateStr = `${viewYear}-${mm}-${dd}`;
          const hasCheckin = checkinDates.has(dateStr);
          const isToday = dateStr === todayStr;
          const isFuture = dateStr > todayStr;

          return (
            <div
              key={dateStr}
              className="flex items-center justify-center py-0.5"
            >
              <div
                className={[
                  "w-8 h-8 flex items-center justify-center rounded-full text-xs transition-all ",
                  hasCheckin
                    ? "bg-indigo-500 text-white font-medium shadow-sm shadow-indigo-200 cursor-pointer"
                    : isToday
                      ? "ring-2 ring-indigo-300 ring-offset-1 text-indigo-600 font-medium"
                      : isFuture
                        ? "text-slate-300 cursor-default"
                        : "text-slate-400 hover:bg-slate-100 cursor-pointer",
                ].join(" ")}
              >
                {day}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-indigo-500" />
          <span className="text-xs text-slate-400">Checked in</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full ring-2 ring-indigo-300" />
          <span className="text-xs text-slate-400">Today</span>
        </div>
      </div>
    </Card>
  );
}
