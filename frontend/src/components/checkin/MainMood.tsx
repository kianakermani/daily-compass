import Card from "../Card";
import Label from "../Label";

import { moodOptions } from "../../constants/moodOptions";

type MainMoodProps = {
  mainMood: string;
  onMainMoodChange: (value: string) => void;
};

export default function MainMood({
  mainMood,
  onMainMoodChange,
}: MainMoodProps) {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm">
      <Label className="text-base text-slate-700 mb-4 block">Main mood</Label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        {moodOptions.map((mood) => {
          const Icon = mood.icon;

          return (
            <button
              key={mood.value}
              type="button"
              onClick={() => onMainMoodChange(mood.value)}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                mainMood === mood.value
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
