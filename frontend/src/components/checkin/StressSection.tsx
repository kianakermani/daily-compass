import Button from "../Button";
import Card from "../Card";
import Label from "../Label";

type StressSectionProps = {
  isStressed: boolean;
  isTired: boolean;
  onStressChange: (value: boolean) => void;
  onTiredChange: (value: boolean) => void;
};

export default function StressSection({
  isStressed,
  isTired,
  onStressChange,
  onTiredChange,
}: StressSectionProps) {
  const items = [
    {
      label: "Feeling stressed?",
      value: isStressed,
      onChange: onStressChange,
    },
    {
      label: "Feeling tired?",
      value: isTired,
      onChange: onTiredChange,
    },
  ];

  return (
    <Card className="p-6 bg-white/80   ">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map(({ label, value, onChange }) => (
          <div key={label} className="flex items-center justify-between">
            <Label className="text-slate-700">{label}</Label>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant={value ? "default" : "outline"}
                onClick={() => onChange(true)}
              >
                Yes
              </Button>

              <Button
                size="sm"
                variant={!value ? "default" : "outline"}
                onClick={() => onChange(false)}
              >
                No
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
