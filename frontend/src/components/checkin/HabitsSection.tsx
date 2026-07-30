import Card from "../Card";
import Label from "../Label";

import type { CheckinData } from "../../types";

type HabitsSectionProps = {
  habits: CheckinData["habits"];
  onHabitChange: (habit: keyof CheckinData["habits"], checked: boolean) => void;
};

export default function HabitsSection({
  habits,
  onHabitChange,
}: HabitsSectionProps) {
  const habitItems = [
    { key: "water", icon: "💧", label: "Drink water" },
    { key: "healthyFood", icon: "🥗", label: "Healthy food" },

    { key: "exercise", icon: "👟", label: "Exercise" },
    { key: "walking", icon: "🚶", label: "Walking" },

    { key: "dancing", icon: "💃", label: "Dancing" },
    { key: "hobby", icon: "🎨", label: "Hobby" },

    { key: "shower", icon: "🚿", label: "Shower" },
    { key: "skincare", icon: "✨", label: "Skincare" },

    { key: "selfCare", icon: "💆", label: "Self care" },
    { key: "meditation", icon: "🧘", label: "Meditation" },

    { key: "quietTime", icon: "🌙", label: "Quiet time" },
    { key: "rest", icon: "🛋️", label: "Rest" },

    { key: "reading", icon: "📚", label: "Reading" },
    { key: "sleepEarly", icon: "😴", label: "Sleep early" },
  ] as const satisfies readonly {
    key: keyof CheckinData["habits"];
    icon: string;
    label: string;
  }[];

  return (
    <Card className="p-6 bg-white/80   ">
      <Label className="text-base text-slate-700 mb-4 block">
        Daily habits
      </Label>

      <div className="grid grid-cols-2 gap-3 pt-2">
        {habitItems.map(({ key, icon, label }) => {
          const selected = habits[key];

          return (
            <button
              key={key}
              type="button"
              onClick={() => onHabitChange(key, !selected)}
              className={`cursor-pointer flex items-center gap-3 rounded-xl border px-3 py-3 text-left    ${
                selected
                  ? "border-indigo-300 bg-indigo-50 text-slate-800 shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                {icon}
              </span>

              <span className="min-w-0 flex-1 text-sm font-medium">
                {label}
              </span>

              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs ${
                  selected
                    ? "border-indigo-500 bg-indigo-500 text-white"
                    : "border-slate-300 bg-white"
                }`}
              >
                {selected ? "✓" : ""}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
