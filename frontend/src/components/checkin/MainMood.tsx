import Card from "../Card";
import Label from "../Label";
import { toast } from "sonner";

import { moodOptions } from "../../constants/moodOptions";

type MainMoodProps = {
  mainMood: string[];
  onMainMoodChange: (value: string[]) => void;
};

export default function MainMood({
  mainMood,
  onMainMoodChange,
}: MainMoodProps) {
  const MAX_MOODS = 4;

  const toggleMood = (value: string) => {
    if (mainMood.includes(value)) {
      onMainMoodChange(mainMood.filter((mood) => mood !== value));
      return;
    }

    if (mainMood.length >= MAX_MOODS) {
      toast.warning("You can select up to 4 moods.");
      return;
    }

    onMainMoodChange([...mainMood, value]);
  };

  return (
    <Card className="p-6 bg-white/80   ">
      <Label className="text-base text-slate-700 mb-4 block">Main mood</Label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        {moodOptions.map((mood) => {
          const Icon = mood.icon;
          const isSelected = mainMood.includes(mood.value);

          return (
            <button
              key={mood.value}
              type="button"
              onClick={() => toggleMood(mood.value)}
              className={`cursor-pointer p-4 rounded-xl border-2    text-center ${
                isSelected
                  ? "border-indigo-400 bg-indigo-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <Icon className={`w-6 h-6 mx-auto mb-2 ${mood.color}`} />

              <span className="text-sm text-slate-700">{mood.label}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
