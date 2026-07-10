import Card from "../Card";
import Checkbox from "../Checkbox";
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
    { key: "water", label: "💧 Drink water" },
    { key: "walking", label: "🚶 Walking" },
    { key: "reading", label: "📚 Reading" },
    { key: "skincare", label: "✨ Skincare" },
  ] as const;

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm">
      <Label className="text-base text-slate-700 mb-4 block">
        Daily habits
      </Label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {habitItems.map(({ key, label }) => (
          <div key={key} className="flex items-center space-x-3">
            <Checkbox
              id={key}
              checked={habits[key]}
              onCheckedChange={(checked) => onHabitChange(key, checked)}
            />

            <Label htmlFor={key} className="cursor-pointer">
              {label}
            </Label>
          </div>
        ))}
      </div>
    </Card>
  );
}
