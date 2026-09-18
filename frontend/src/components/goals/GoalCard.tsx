import { useState } from "react";
import { CheckCircle2, Trash2 } from "lucide-react";
import Button from "../Button";
import Card from "../Card";
import Progress from "../Progress";
import ConfirmDialog from "../history/ConfirmDialog";
import type { Goal } from "../../types";

const GOAL_CATEGORIES = [
  { id: "personal", label: "Personal", icon: "🎯" },
  { id: "hobbies", label: "Hobbies & Fun", icon: "🎨" },
  { id: "health", label: "Health & Fitness", icon: "🌿" },
  { id: "learning", label: "Learning", icon: "📚" },
  { id: "career", label: "Career", icon: "💼" },
  { id: "finance", label: "Finance", icon: "💰" },
];

function getGoalCategory(id: string | undefined) {
  return GOAL_CATEGORIES.find((c) => c.id === id) ?? GOAL_CATEGORIES[0];
}

// Extends the shared Goal type locally with an optional category,
// so this module doesn't require editing the global types.ts file.
type GoalWithCategory = Goal & { category?: string };

interface GoalCardProps {
  goal: GoalWithCategory;
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

  const dueLabel =
    days === null
      ? null
      : days > 0
        ? `${days} days remaining`
        : days === 0
          ? "Due today"
          : "Overdue";

  const isOverdue = days !== null && days < 0;
  const category = getGoalCategory(goal.category);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  return (
    <Card className="p-6 bg-white/80   ">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h4 className="text-base font-medium text-slate-800">
              {goal.title}
            </h4>
            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 whitespace-nowrap">
              <span>{category.icon}</span>
              {category.label}
            </span>
            {dueLabel && (
              <span
                className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                  isOverdue
                    ? "bg-red-50 text-red-500"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                ⏳ {dueLabel}
              </span>
            )}
          </div>
          {goal.description && (
            <p className="text-sm text-slate-500 descriptionGoal">
              {goal.description}
            </p>
          )}
        </div>
        <button
          onClick={() => setIsDeleteConfirmOpen(true)}
          title="Delete goal"
          aria-label="Delete goal"
          className="text-slate-300 cursor-pointer hover:text-red-400 transition-colors p-1 shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">Progress</span>
          <span className="text-sm font-medium text-slate-700">
            {goal.progress}%
          </span>
        </div>
        <Progress value={goal.progress} />
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
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
          onClick={() => onProgress(goal.id, Math.min(100, goal.progress + 10))}
          className="flex-1"
        >
          +10%
        </Button>
        <Button
          size="sm"
          onClick={() => onToggle(goal.id)}
          className="flex-1 bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100"
        >
          <CheckCircle2 className="w-4 h-4 mr-1" />
          Complete
        </Button>
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
