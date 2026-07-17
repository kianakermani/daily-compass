import { CheckCircle2, Circle, Trash2 } from "lucide-react";
import Card from "../Card";
import type { Goal } from "../../types";

interface CompletedGoalCardProps {
  goal: Goal;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CompletedGoalCard({
  goal,
  onToggle,
  onDelete,
}: CompletedGoalCardProps) {
  return (
    <Card className="p-5 bg-white/80 backdrop-blur-sm opacity-70">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-slate-700 line-through">
              {goal.title}
            </h4>
            {goal.description && (
              <p className="text-xs text-slate-400 mt-0.5">
                {goal.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggle(goal.id)}
            className="text-slate-300 hover:text-indigo-500 transition-colors p-1"
          >
            <Circle className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(goal.id)}
            className="text-slate-300 hover:text-red-400 transition-colors p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
