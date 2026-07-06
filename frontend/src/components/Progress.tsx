type ProgressProps = {
  value: number;
  className?: string;
};

export default function Progress({ value, className = "" }: ProgressProps) {
  const progress = Math.min(100, Math.max(0, value));

  const container = "w-full h-2 overflow-hidden rounded-full bg-slate-100";

  const bar = "h-full rounded-full bg-indigo-500 transition-all duration-300";

  return (
    <div className={`${container} ${className}`}>
      <div className={bar} style={{ width: `${progress}%` }} />
    </div>
  );
}
