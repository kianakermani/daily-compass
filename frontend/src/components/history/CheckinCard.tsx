// Components
import Card from "../Card";

// React
import { useEffect, useMemo, useState } from "react";

// Constants
import { moodOptions } from "../../constants/moodOptions";

// Types
import type { CheckinData } from "../../types";

// Icons
import {
  CheckCircle2,
  CloudRain,
  CreditCard,
  MoreHorizontal,
  Smile,
  Star,
  Sun,
  StickyNote,
  X,
  type LucideIcon,
} from "lucide-react";

type CheckinCardProps = {
  checkin: CheckinData;
};

const habitLabels: Record<keyof CheckinData["habits"], string> = {
  water: "Water",
  healthyFood: "Healthy food",
  exercise: "Exercise",
  walking: "Walking",
  dancing: "Dancing",
  shower: "Shower",
  skincare: "Skincare",
  selfCare: "Self care",
  meditation: "Meditation",
  quietTime: "Quiet time",
  rest: "Rest",
  reading: "Reading",
  hobby: "Hobby",
  sleepEarly: "Sleep early",
};

function formatCheckinDate(date: string) {
  return new Date(date + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatExpenseType(type: CheckinData["spending"]["type"]) {
  return type.length > 0
    ? type
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
        .join(", ")
    : "Not added";
}

function DetailSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h4 className="flex items-center gap-1.5 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
        {Icon && <Icon className="h-3.5 w-3.5 text-indigo-400" />}
        {title}
      </h4>
      {children}
    </section>
  );
}

function DetailRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="min-w-0 rounded-xl bg-slate-50 px-3 py-2 text-left">
      <p className="flex items-center gap-1.5 text-xs text-slate-400">
        {Icon && <Icon className="h-3.5 w-3.5 shrink-0 text-indigo-200" />}
        {label}
      </p>
      <p className="mt-0.5 wrap-break-word text-sm text-slate-700">
        {value || "Not added"}
      </p>
    </div>
  );
}

export default function CheckinCard({ checkin }: CheckinCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const completedHabits = useMemo(
    () =>
      Object.entries(checkin.habits)
        .filter(([, done]) => done)
        .map(([habit]) => habit as keyof CheckinData["habits"]),
    [checkin.habits],
  );

  const visibleHabits = completedHabits.slice(0, 5);
  const hiddenHabitCount = completedHabits.length - visibleHabits.length;
  const formattedDate = formatCheckinDate(checkin.date);

  useEffect(() => {
    if (!isDetailsOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDetailsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDetailsOpen]);

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

        <div className="space-y-4 pr-9">
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
              {checkin.mainMood.map((mood) => {
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

              {checkin.isStressed && (
                <span className="px-2.5 py-0.5 bg-red-50 text-red-600 rounded-full text-xs">
                  Stressed
                </span>
              )}

              {checkin.isTired && (
                <span className="px-2.5 py-0.5 bg-orange-50 text-orange-600 rounded-full text-xs">
                  Tired
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {visibleHabits.map((habit) => (
                <span
                  key={habit}
                  className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs"
                >
                  {habitLabels[habit]}
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
        <div
          className="fixed inset-0 z-50 flex items-end bg-slate-900/40 px-4 py-4 backdrop-blur-sm sm:items-center sm:justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`checkin-details-${checkin.date}`}
          onMouseDown={() => setIsDetailsOpen(false)}
        >
          <div
            className="w-full overflow-hidden rounded-2xl bg-white shadow-xl sm:max-w-xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="checkin-details-scrollbar max-h-[80vh] overflow-y-auto overscroll-contain">
              <div className="sticky top-0 z-10 mb-5 flex items-start justify-between gap-4 border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
                <div className="text-left">
                  <h3
                    id={`checkin-details-${checkin.date}`}
                    className="text-lg font-medium text-slate-800"
                  >
                    {formattedDate}
                  </h3>

                  <p className="text-2xl font-light leading-7 text-indigo-600">
                    {checkin.moodScore}/10
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Close check-in details"
                  onClick={() => setIsDetailsOpen(false)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-5 px-5 pb-5 sm:px-6 sm:pb-6">
                <DetailSection title="Mood" icon={Smile}>
                  <div className="flex flex-wrap gap-1.5">
                    {checkin.mainMood.length > 0 ? (
                      checkin.mainMood.map((mood) => {
                        const moodOption = moodOptions.find(
                          (m) => m.value === mood,
                        );
                        const Icon = moodOption?.icon ?? Smile;

                        return (
                          <span
                            key={mood}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs"
                          >
                            <Icon className="h-3 w-3 shrink-0" />
                            {moodOption?.label ?? mood}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-sm text-slate-500">Not added</span>
                    )}

                    {checkin.isStressed && (
                      <span className="px-2.5 py-1 bg-red-50 text-red-600 rounded-full text-xs">
                        Stressed
                      </span>
                    )}

                    {checkin.isTired && (
                      <span className="px-2.5 py-1 bg-orange-50 text-orange-600 rounded-full text-xs">
                        Tired
                      </span>
                    )}
                  </div>
                </DetailSection>

                <DetailSection title="Habits" icon={CheckCircle2}>
                  <div className="flex flex-wrap gap-1.5">
                    {completedHabits.length > 0 ? (
                      completedHabits.map((habit) => (
                        <span
                          key={habit}
                          className="px-2.5 py-1 bg-green-50 text-green-700 rounded text-xs"
                        >
                          {habitLabels[habit]}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-500">
                        No habits completed
                      </span>
                    )}
                  </div>
                </DetailSection>

                <DetailSection title="Spending" icon={CreditCard}>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <DetailRow
                      label="Amount"
                      value={
                        checkin.spending.amount
                          ? `${checkin.spending.amount} ${checkin.spending.currency}`
                          : ""
                      }
                    />
                    <DetailRow
                      label="Expense type"
                      value={formatExpenseType(checkin.spending.type)}
                    />
                    <DetailRow
                      label="Spending categories"
                      value={checkin.spending.categories}
                    />
                    <DetailRow
                      label="Financial mood"
                      value={checkin.spending.financialMood}
                    />
                  </div>
                </DetailSection>

                <DetailSection title="Day reflection" icon={Sun}>
                  <div className="space-y-2">
                    <DetailRow
                      label="Best part of the day"
                      value={checkin.bestPart}
                      icon={Star}
                    />
                    <DetailRow
                      label="Worst part of the day"
                      value={checkin.worstPart}
                      icon={CloudRain}
                    />
                    <DetailRow
                      label="Additional notes"
                      value={checkin.notes}
                      icon={StickyNote}
                    />
                  </div>
                </DetailSection>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
