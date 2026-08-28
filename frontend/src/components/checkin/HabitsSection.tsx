import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import Card from "../Card";
import Label from "../Label";

import type { CheckinData } from "../../types";

type HabitKey = keyof CheckinData["habits"];
type DashboardHabitKey = Exclude<HabitKey, "selfCare">;

type HabitItem = {
  key: DashboardHabitKey;
  icon: string;
  label: string;
};

type HabitsSectionProps = {
  habits: CheckinData["habits"];
  onHabitChange: (habit: keyof CheckinData["habits"], checked: boolean) => void;
  onHabitsChange: (habits: CheckinData["habits"]) => void;
};

const habitPreferenceKey = "daily-compass-dashboard-habits";
const dashboardHabitLimit = 8;

const defaultDashboardHabitKeys = [
  "water",
  "healthyFood",
  "exercise",
  "reading",
  "skincare",
  "meditation",
  "hobby",
  "sleepEarly",
] as const satisfies readonly DashboardHabitKey[];

const allHabitItems: readonly HabitItem[] = [
  { key: "water", icon: "💧", label: "Drink Water" },
  { key: "healthyFood", icon: "🥗", label: "Healthy Eating" },
  { key: "exercise", icon: "🏃", label: "Exercise" },
  { key: "reading", icon: "📚", label: "Reading" },
  { key: "skincare", icon: "🌟", label: "Skincare" },
  { key: "meditation", icon: "🧘", label: "Meditation" },
  { key: "hobby", icon: "🎨", label: "Hobby" },
  { key: "sleepEarly", icon: "😴", label: "Sleep Early" },
  { key: "walking", icon: "🚶", label: "Walking" },
  { key: "dancing", icon: "💃", label: "Dancing" },
  { key: "shower", icon: "🚿", label: "Shower" },
  { key: "quietTime", icon: "🌙", label: "Quiet Time" },
  { key: "rest", icon: "🛋️", label: "Rest" },
  { key: "journaling", icon: "✍️", label: "Journaling" },
  { key: "noScreenTime", icon: "📵", label: "No Screen Time" },
  { key: "stretching", icon: "🤸", label: "Stretching" },
] as const;

function isDashboardHabitKey(
  value: unknown,
): value is DashboardHabitKey {
  return allHabitItems.some(({ key }) => key === value);
}

function loadDashboardHabitKeys(): DashboardHabitKey[] {
  try {
    const saved = localStorage.getItem(habitPreferenceKey);
    if (!saved) return [...defaultDashboardHabitKeys];

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [...defaultDashboardHabitKeys];

    const selectedKeys = parsed.filter(isDashboardHabitKey);
    return selectedKeys.length === dashboardHabitLimit
      ? selectedKeys
      : [...defaultDashboardHabitKeys];
  } catch (error) {
    console.error("Error loading dashboard habit preferences:", error);
    return [...defaultDashboardHabitKeys];
  }
}

export default function HabitsSection({
  habits,
  onHabitChange,
  onHabitsChange,
}: HabitsSectionProps) {
  const [dashboardHabitKeys, setDashboardHabitKeys] = useState<
    DashboardHabitKey[]
  >(
    loadDashboardHabitKeys,
  );
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [draftHabitKeys, setDraftHabitKeys] = useState(dashboardHabitKeys);

  const dashboardHabitItems = useMemo(
    () =>
      dashboardHabitKeys
        .map((key) => allHabitItems.find((habitItem) => habitItem.key === key))
        .filter((habitItem): habitItem is HabitItem => Boolean(habitItem)),
    [dashboardHabitKeys],
  );

  const completedDashboardHabits = dashboardHabitItems.filter(
    ({ key }) => habits[key],
  ).length;
  const completionPercent = Math.round(
    (completedDashboardHabits / dashboardHabitItems.length) * 100,
  );
  const isDraftAtLimit = draftHabitKeys.length >= dashboardHabitLimit;

  useEffect(() => {
    if (!isManageModalOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsManageModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isManageModalOpen]);

  const handleOpenManageModal = () => {
    setDraftHabitKeys(dashboardHabitKeys);
    setIsManageModalOpen(true);
  };

  const handleDraftHabitToggle = (key: DashboardHabitKey) => {
    setDraftHabitKeys((currentKeys) => {
      if (currentKeys.includes(key)) {
        return currentKeys.filter((habitKey) => habitKey !== key);
      }

      if (currentKeys.length >= dashboardHabitLimit) {
        return currentKeys;
      }

      return [...currentKeys, key];
    });
  };

  const handleSaveDashboardHabits = () => {
    if (draftHabitKeys.length !== dashboardHabitLimit) return;

    const previousDashboardKeys = new Set<HabitKey>(dashboardHabitKeys);
    const nextDashboardKeys = new Set<HabitKey>(draftHabitKeys);
    const nextHabits = { ...habits };

    (Object.keys(nextHabits) as HabitKey[]).forEach((habitKey) => {
      const isRemovedFromDashboard = !nextDashboardKeys.has(habitKey);
      const isNewlyAddedToDashboard =
        nextDashboardKeys.has(habitKey) && !previousDashboardKeys.has(habitKey);

      if (isRemovedFromDashboard || isNewlyAddedToDashboard) {
        nextHabits[habitKey] = false;
      }
    });

    setDashboardHabitKeys(draftHabitKeys);
    onHabitsChange(nextHabits);
    localStorage.setItem(habitPreferenceKey, JSON.stringify(draftHabitKeys));
    setIsManageModalOpen(false);
  };

  const renderHabitButton = ({ key, icon, label }: HabitItem) => {
    const selected = habits[key];

    return (
      <button
        key={key}
        type="button"
        onClick={() => onHabitChange(key, !selected)}
        className={`cursor-pointer flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-200 ${
          selected
            ? "border-indigo-300 bg-indigo-50 text-slate-800 shadow-sm"
            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
        }`}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
          {icon}
        </span>

        <span className="min-w-0 flex-1 text-sm font-medium">{label}</span>

        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs transition-colors ${
            selected
              ? "border-indigo-500 bg-indigo-500 text-white"
              : "border-slate-300 bg-white"
          }`}
        >
          {selected ? "✓" : ""}
        </span>
      </button>
    );
  };

  return (
    <Card className="p-6 bg-white/80">
      <div className="mb-5 space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <Label className="text-base text-slate-700 block">Daily habits</Label>
          <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {`${completedDashboardHabits} of ${dashboardHabitItems.length} completed (${completionPercent}%)`}
          </span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-500 ease-out"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
        {dashboardHabitItems.map(renderHabitButton)}
      </div>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={handleOpenManageModal}
          className="flex w-full cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
        >
          ⚙️ Manage Habits
        </button>
      </div>

      {isManageModalOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex items-end bg-slate-900/40 px-4 py-4 backdrop-blur-sm sm:items-center sm:justify-center"
              role="dialog"
              aria-modal="true"
              aria-labelledby="manage-habits-title"
              onMouseDown={() => setIsManageModalOpen(false)}
            >
              <div
                className="w-full overflow-hidden rounded-2xl bg-white shadow-xl sm:max-w-2xl"
                onMouseDown={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
                  <div>
                    <h3
                      id="manage-habits-title"
                      className="text-lg font-medium text-slate-800"
                    >
                      Manage Habits
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Select up to 8 habits for your dashboard
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label="Close habit management"
                    onClick={() => setIsManageModalOpen(false)}
                    className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="max-h-[75vh] overflow-y-auto px-5 py-4 sm:px-6">
                  <div className="mb-3 flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-slate-700">
                      Dashboard habits
                    </span>
                    <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
                      {draftHabitKeys.length}/{dashboardHabitLimit} selected
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {allHabitItems.map(({ key, icon, label }) => {
                      const checked = draftHabitKeys.includes(key);
                      const disabled = !checked && isDraftAtLimit;

                      return (
                        <label
                          key={key}
                          className={`flex items-center gap-3 rounded-xl border px-3 py-3 text-sm transition-colors ${
                            checked
                              ? "border-indigo-300 bg-indigo-50 text-slate-800"
                              : "border-slate-200 bg-white text-slate-600"
                          } ${
                            disabled
                              ? "cursor-not-allowed opacity-50"
                              : "cursor-pointer hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={disabled}
                            onChange={() => handleDraftHabitToggle(key)}
                            className="h-4 w-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-200"
                          />
                          <span className="text-lg">{icon}</span>
                          <span className="min-w-0 font-medium">{label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                  <button
                    type="button"
                    onClick={() => setIsManageModalOpen(false)}
                    className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveDashboardHabits}
                    disabled={draftHabitKeys.length !== dashboardHabitLimit}
                    className="cursor-pointer rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </Card>
  );
}
