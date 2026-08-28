import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import HistoryStats from "../components/history/HistoryStats";
import MoodChart from "../components/history/MoodChart";
import CheckinCalendar from "../components/history/CheckinCalendar";
import CheckinList from "../components/history/CheckinList";
import ConfirmDialog from "../components/history/ConfirmDialog";
import {
  clearCheckinHistory,
  deleteCheckin,
  loadCheckins,
} from "../utils/history";
import { getHistoryStats } from "../utils/historyStats";

// Types
import type { CheckinData } from "../types";

export default function History() {
  const [checkins, setCheckins] = useState<CheckinData[]>([]);
  const [isClearHistoryConfirmOpen, setIsClearHistoryConfirmOpen] =
    useState(false);

  useEffect(() => {
    setCheckins(loadCheckins());
  }, []);

  const { chartData, stats } = getHistoryStats(checkins);

  const handleDeleteCheckin = (date: string) => {
    setCheckins(deleteCheckin(date));
    toast.success("Check-in deleted");
  };

  const handleClearHistory = () => {
    clearCheckinHistory();
    setCheckins([]);
    setIsClearHistoryConfirmOpen(false);
    toast.success("History cleared");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium text-slate-800 mb-1">History</h2>

        <p className="text-sm text-slate-500">Your journey so far</p>
      </div>

      <HistoryStats stats={stats} />

      <CheckinCalendar checkins={checkins} />

      <MoodChart chartData={chartData} />

      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-medium text-slate-700">
            Recent check-ins
          </h3>

          <button
            type="button"
            onClick={() => setIsClearHistoryConfirmOpen(true)}
            disabled={checkins.length === 0}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-100 bg-white px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:border-red-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <Trash2 className="h-4 w-4" />
            Clear All History
          </button>
        </div>

        <CheckinList checkins={checkins} onDelete={handleDeleteCheckin} />
      </div>

      {isClearHistoryConfirmOpen && (
        <ConfirmDialog
          title="Clear all history"
          message="This action cannot be undone. Every saved check-in will be permanently deleted."
          confirmLabel="Clear All History"
          intent="danger"
          onCancel={() => setIsClearHistoryConfirmOpen(false)}
          onConfirm={handleClearHistory}
        />
      )}
    </div>
  );
}
