import { type ChangeEvent } from "react";

type CheckboxProps = {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export default function Checkbox({
  id,
  checked,
  onCheckedChange,
}: CheckboxProps) {
  const base = "w-4 h-4 rounded accent-indigo-500 cursor-pointer";

  return (
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        onCheckedChange(e.target.checked)
      }
      className={base}
    />
  );
}
