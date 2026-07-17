import CompletedGoalCard from "./CompletedGoalCard";
import type { Goal } from "../../types";

interface CompletedGoalsProps {
  goals: Goal[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CompletedGoals({
  goals,
  onToggle,
  onDelete,
}: CompletedGoalsProps) {
  if (goals.length === 0) return null;

  return (
    <div>
      <h3 className="text-base font-medium text-slate-700 mb-4">
        Completed goals
      </h3>
      <div className="space-y-3">
        {goals.map((goal) => (
          <CompletedGoalCard
            key={goal.id}
            goal={goal}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
