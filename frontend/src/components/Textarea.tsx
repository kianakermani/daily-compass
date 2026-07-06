import { type ChangeEvent } from "react";

type TextareaProps = {
  id?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
};

export default function Textarea({
  id,
  placeholder,
  value,
  onChange,
  className = "",
}: TextareaProps) {
  const base =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none min-h-24";

  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${base} ${className}`}
    />
  );
}
