import { useEffect, useState } from "react";

import HistoryStats from "../components/history/HistoryStats";
import MoodChart from "../components/history/MoodChart";
import CheckinCalendar from "../components/history/CheckinCalendar";
import CheckinList from "../components/history/CheckinList";
import { loadCheckins } from "../utils/history";
import { getHistoryStats } from "../utils/historyStats";

// Types
import type { CheckinData } from "../types";

export default function History() {
  const [checkins, setCheckins] = useState<CheckinData[]>([]);

  useEffect(() => {
    setCheckins(loadCheckins());
  }, []);

  const { chartData, stats } = getHistoryStats(checkins);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium text-slate-800 mb-1">History</h2>

        <p className="text-sm text-slate-500">Your journey so far</p>
      </div>

      <HistoryStats stats={stats} />

      <CheckinCalendar checkins={checkins} />

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
