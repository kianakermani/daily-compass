import Card from "../Card";
import Label from "../Label";
import {
  physicalStateOptions,
  mentalStateOptions,
  sleepOptions,
  type StateOption,
} from "../../constants/stateOptions";

type PhysicalMentalStateSectionProps = {
  physicalStates: string[];
  mentalStates: string[];
  sleepQuality: "good" | "poor" | null;
  onPhysicalStatesChange: (value: string[]) => void;
  onMentalStatesChange: (value: string[]) => void;
  onSleepQualityChange: (value: "good" | "poor" | null) => void;
};

function StateChip({
  option,
  isSelected,
  onClick,
}: {
  option: StateOption;
  isSelected: boolean;
  onClick: () => void;
}) {
  const Icon = option.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-xl border-2 text-center transition-colors ${
        isSelected
          ? "border-indigo-400 bg-indigo-50"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <Icon className={`w-6 h-6 mx-auto mb-2 ${option.color}`} />
      <span className="text-sm text-slate-700">{option.label}</span>
    </button>
  );
}

export default function PhysicalMentalStateSection({
  physicalStates,
  mentalStates,
  sleepQuality,
  onPhysicalStatesChange,
  onMentalStatesChange,
  onSleepQualityChange,
}: PhysicalMentalStateSectionProps) {
  const togglePhysicalState = (value: string) => {
    if (physicalStates.includes(value)) {
      onPhysicalStatesChange(physicalStates.filter((state) => state !== value));
    } else {
      onPhysicalStatesChange([...physicalStates, value]);
    }
  };

  const toggleMentalState = (value: string) => {
    if (mentalStates.includes(value)) {
      onMentalStatesChange(mentalStates.filter((state) => state !== value));
    } else {
      onMentalStatesChange([...mentalStates, value]);
    }
  };

  const handleSleepQualityClick = (value: "good" | "poor") => {
    if (sleepQuality === value) {
      onSleepQualityChange(null);
    } else {
      onSleepQualityChange(value);
    }
  };

  return (
    <Card className="p-6 bg-white/80">
      <Label className="text-base text-slate-700 mb-4 block">
        Physical & Mental State
      </Label>

      {/* Physical State Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-slate-600 mb-3">Physical</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {physicalStateOptions.map((option) => (
            <StateChip
              key={option.value}
              option={option}
              isSelected={physicalStates.includes(option.value)}
              onClick={() => togglePhysicalState(option.value)}
            />
          ))}
        </div>
      </div>

      {/* Mental State Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-slate-600 mb-3">Mental</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {mentalStateOptions.map((option) => (
            <StateChip
              key={option.value}
              option={option}
              isSelected={mentalStates.includes(option.value)}
              onClick={() => toggleMentalState(option.value)}
            />
          ))}
        </div>
      </div>

      {/* Sleep Section */}
      <div>
        <h3 className="text-sm font-medium text-slate-600 mb-3">Sleep</h3>
        <div className="grid grid-cols-2 gap-3">
          {sleepOptions.map((option) => (
            <StateChip
              key={option.value}
              option={option}
              isSelected={sleepQuality === option.value}
              onClick={() =>
                handleSleepQualityClick(option.value as "good" | "poor")
              }
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
