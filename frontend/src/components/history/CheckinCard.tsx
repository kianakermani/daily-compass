// Components
import Card from "../Card";
import ConfirmDialog from "./ConfirmDialog";
import CheckinDetailsDialog from "./CheckinDetailsDialog";

// React
import { useMemo, useState } from "react";

// Constants
import { moodOptions } from "../../constants/moodOptions";

// Types
import type { CheckinData } from "../../types";

//utils
import { habitLabels, formatCheckinDate } from "../../utils/checkinDetails";

// Icons
import { MoreHorizontal, Smile, Trash2 } from "lucide-react";

type CheckinCardProps = {
  checkin: CheckinData;
  onDelete: (date: string) => void;
};

export default function CheckinCard({ checkin, onDelete }: CheckinCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const completedHabits = useMemo(
    () =>
      Object.entries(checkin.habits || {})
        .filter(([, done]) => done)
        .map(([habit]) => habit as keyof CheckinData["habits"]),
    [checkin.habits],
  );

  const visibleHabits = completedHabits.slice(0, 5);
  const hiddenHabitCount = completedHabits.length - visibleHabits.length;
  const formattedDate = formatCheckinDate(checkin.date || "");

  return (
    <>
      <Card className="relative p-5 bg-white/80 hover:shadow-md transition-shadow">
        <button
          type="button"
          aria-label="View check-in details"
          onClick={() => setIsDetailsOpen(true)}
          className="absolute right-4 cursor-pointer top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Delete check-in"
          onClick={() => setIsDeleteConfirmOpen(true)}
          className="absolute bottom-3 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-slate-300 transition hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
        >
          <Trash2 className="h-4 w-4" />
        </button>

        <div className="space-y-4">
          <div className="flex justify-start text-center">
            <div className="ms-0.5">
              <p className="text-xs font-medium text-slate-400">
                {formattedDate}
              </p>

              <p className="text-lg font-light leading-6 text-indigo-600">
                {checkin.moodScore}/10
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {(checkin.mainMood || []).map((mood) => {
                const moodOption = moodOptions.find((m) => m.value === mood);
                const Icon = moodOption?.icon ?? Smile;

                return (
                  <span
                    key={mood}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-xs"
                  >
                    <Icon className="h-3 w-3 shrink-0" />
                    {moodOption?.label ?? mood}
                  </span>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {visibleHabits.map((habit) => (
                <span
                  key={habit}
                  className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs"
                >
                  {habitLabels[habit] || habit}
                </span>
              ))}

              {hiddenHabitCount > 0 && (
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-xs">
                  +{hiddenHabitCount} more
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>

      {isDetailsOpen && (
        <CheckinDetailsDialog
          checkin={checkin}
          onClose={() => setIsDetailsOpen(false)}
        />
      )}

      {isDeleteConfirmOpen && (
        <ConfirmDialog
          title="Delete check-in"
          message="Are you sure you want to delete this check-in?"
          confirmLabel="Delete"
          intent="danger"
          onCancel={() => setIsDeleteConfirmOpen(false)}
          onConfirm={() => {
            onDelete(checkin.date);
            setIsDeleteConfirmOpen(false);
          }}
        />
      )}
    </>
  );
}
