import GoalCard from "./GoalCard";
import type { Goal } from "../../types";

interface ActiveGoalsProps {
  goals: Goal[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onProgress: (id: string, progress: number) => void;
}

export default function ActiveGoals({
  goals,
  onDelete,
  onToggle,
  onProgress,
}: ActiveGoalsProps) {
  if (goals.length === 0) return null;

  return (
    <div>
      <h3 className="text-base font-medium text-slate-700 mb-4">
        Active goals
      </h3>
      <div className="space-y-4">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onDelete={onDelete}
            onToggle={onToggle}
            onProgress={onProgress}
          />
        ))}
      </div>
    </div>
  );
}
