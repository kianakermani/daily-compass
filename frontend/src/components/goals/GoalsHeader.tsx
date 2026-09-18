import { Plus } from "lucide-react";
import Button from "../Button";

interface GoalsHeaderProps {
  onToggleAdd: () => void;
  hasGoals: boolean;
}

export default function GoalsHeader({
  onToggleAdd,
  hasGoals,
}: GoalsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-medium text-slate-800 mb-1">Goals</h2>
        <p className="text-sm text-slate-500">Track your personal goals</p>
      </div>
      {hasGoals && (
        <Button onClick={onToggleAdd}>
          <Plus className="w-4 h-4 mr-1.5" />
          New Goal
        </Button>
      )}
    </div>
  );
}
