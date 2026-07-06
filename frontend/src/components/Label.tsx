import { type ReactNode } from "react";

type LabelProps = {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
};

export default function Label({
  htmlFor,
  children,
  className = "",
}: LabelProps) {
  const base = "text-sm font-medium text-slate-700";

  return (
    <label htmlFor={htmlFor} className={`${base} ${className}`}>
      {children}
    </label>
  );
}
