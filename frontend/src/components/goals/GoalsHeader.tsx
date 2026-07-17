import { Plus } from "lucide-react";
import Button from "../Button";

interface GoalsHeaderProps {
  onToggleAdd: () => void;
}

export default function GoalsHeader({ onToggleAdd }: GoalsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-medium text-slate-800 mb-1">Goals</h2>
        <p className="text-sm text-slate-500">Track your personal goals</p>
      </div>
      <Button onClick={onToggleAdd}>
        <Plus className="w-4 h-4 mr-1.5" />
        New Goal
      </Button>
    </div>
  );
}
