import { CheckCircle2, Trash2 } from "lucide-react";
import Button from "../Button";
import Card from "../Card";
import Progress from "../Progress";
import type { Goal } from "../../types";

interface GoalCardProps {
  goal: Goal;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onProgress: (id: string, progress: number) => void;
}

export default function GoalCard({
  goal,
  onDelete,
  onToggle,
  onProgress,
}: GoalCardProps) {
  const days = goal.targetDate
    ? Math.ceil(
        (new Date(goal.targetDate).getTime() - Date.now()) /
          (1000 * 60 * 60 * 24),
      )
    : null;

  return (
    <Card className="p-6 bg-white/80   ">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="text-base font-medium text-slate-800 mb-1">
            {goal.title}
          </h4>
          {goal.description && (
            <p className="text-sm text-slate-500 mb-1">{goal.description}</p>
          )}
          {days !== null && (
            <p className="text-xs text-slate-400">
              {days > 0
                ? `${days} days remaining`
                : days === 0
                  ? "Due today"
                  : "Overdue"}
            </p>
          )}
        </div>
        <button
          onClick={() => onDelete(goal.id)}
          className="text-slate-300 hover:text-red-400 transition-colors p-1"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Progress value={goal.progress} />
          <span className="text-sm text-slate-500 min-w-10 text-right">
            {goal.progress}%
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onProgress(goal.id, Math.max(0, goal.progress - 10))}
            className="flex-1"
          >
            −10%
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onProgress(goal.id, Math.min(100, goal.progress + 10))
            }
            className="flex-1"
          >
            +10%
          </Button>
          <Button
            size="sm"
            onClick={() => onToggle(goal.id)}
            className="flex-1 bg-green-500 hover:bg-green-600"
          >
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Done
          </Button>
        </div>
      </div>
    </Card>
  );
}
