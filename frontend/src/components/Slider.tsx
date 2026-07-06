import { type ChangeEvent } from "react";

type SliderProps = {
  value: number[];
  onValueChange: (value: number[]) => void;
  min: number;
  max: number;
  step: number;
};

export default function Slider({
  value,
  onValueChange,
  min,
  max,
  step,
}: SliderProps) {
  const base = "w-full accent-indigo-500 cursor-pointer";

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        onValueChange([Number(e.target.value)])
      }
      className={base}
    />
  );
}
