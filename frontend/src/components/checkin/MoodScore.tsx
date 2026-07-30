import Card from "../Card";
import Label from "../Label";
import Slider from "../Slider";

type MoodScoreProps = {
  moodScore: number;
  onMoodScoreChange: (value: number) => void;
};

export default function MoodScore({
  moodScore,
  onMoodScoreChange,
}: MoodScoreProps) {
  return (
    <Card className="p-6 bg-white/80   ">
      <div className="space-y-4">
        <Label className="text-base text-slate-700">
          How are you feeling today?
        </Label>

        <div className="space-y-3 pt-2">
          <div className="relative flex items-center justify-between mt-1">
            <span className="text-sm text-slate-400">Not great</span>

            <span className="absolute left-1/2 -translate-x-1/2 text-3xl font-light text-indigo-600 tabular-nums">
              {Number(moodScore.toFixed(2))}
            </span>

            <span className="text-sm text-slate-400">Amazing</span>
          </div>

          <Slider
            value={[moodScore]}
            onValueChange={(value) => onMoodScoreChange(value[0])}
            min={1}
            max={10}
            step={0.25}
          />

          <div className="flex justify-between text-xs text-slate-300 px-0.5">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i + 1}>{i + 1}</span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
