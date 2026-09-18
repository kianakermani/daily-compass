import { useState } from "react";
import { CheckCircle2, RotateCcw, Trash2 } from "lucide-react";
import Card from "../Card";
import ConfirmDialog from "../history/ConfirmDialog";
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
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  return (
    <Card className="p-5 bg-white/80    opacity-70">
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
            title="Mark as active again"
            aria-label="Mark as active again"
            className="text-slate-300 cursor-pointer hover:text-indigo-500 transition-colors p-1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsDeleteConfirmOpen(true)}
            title="Delete goal"
            aria-label="Delete goal"
            className="text-slate-300 cursor-pointer hover:text-red-400 transition-colors p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isDeleteConfirmOpen && (
        <ConfirmDialog
          title="Delete goal"
          message={`This will permanently delete "${goal.title}". This action cannot be undone.`}
          confirmLabel="Delete Goal"
          intent="danger"
          onCancel={() => setIsDeleteConfirmOpen(false)}
          onConfirm={() => {
            onDelete(goal.id);
            setIsDeleteConfirmOpen(false);
          }}
        />
      )}
    </Card>
  );
}
