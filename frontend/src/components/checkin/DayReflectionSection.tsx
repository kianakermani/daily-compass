import Card from "../Card";
import Label from "../Label";
import Textarea from "../Textarea";

type DayReflectionSectionProps = {
  bestPart: string;
  worstPart: string;
  onBestPartChange: (value: string) => void;
  onWorstPartChange: (value: string) => void;
};

export default function DayReflectionSection({
  bestPart,
  worstPart,
  onBestPartChange,
  onWorstPartChange,
}: DayReflectionSectionProps) {
  return (
    <Card className="p-6 bg-white/80 ">
      <div className="space-y-4">
        <div>
          <Label htmlFor="best-part" className="text-slate-700 mb-2 block">
            Best part of the day
          </Label>

          <Textarea
            id="best-part"
            placeholder="What made you smile today?"
            value={bestPart}
            onChange={(e) => onBestPartChange(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="worst-part" className="text-slate-700 mb-2 block">
            Worst part of the day
          </Label>

          <Textarea
            id="worst-part"
            placeholder="What was challenging?"
            value={worstPart}
            onChange={(e) => onWorstPartChange(e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
}
