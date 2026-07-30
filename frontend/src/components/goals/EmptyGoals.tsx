import { Plus, Target } from "lucide-react";
import Button from "../Button";
import Card from "../Card";

interface EmptyGoalsProps {
  onCreateClick: () => void;
}

export default function EmptyGoals({ onCreateClick }: EmptyGoalsProps) {
  return (
    <Card className="p-12 bg-white/80    text-center">
      <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
        <Target className="w-8 h-8 text-indigo-500" />
      </div>
      <h3 className="text-base font-medium text-slate-700 mb-2">
        No goals yet
      </h3>
      <p className="text-sm text-slate-400 mb-6">
        Start by creating your first goal
      </p>
      <Button onClick={onCreateClick}>
        <Plus className="w-4 h-4 mr-1.5" />
        Create Goal
      </Button>
    </Card>
  );
}
