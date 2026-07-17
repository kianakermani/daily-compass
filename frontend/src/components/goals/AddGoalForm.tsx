import Button from "../Button";
import Card from "../Card";
import Input from "../Input";
import Label from "../Label";
import Textarea from "../Textarea";

interface NewGoal {
  title: string;
  description: string;
  targetDate: string;
}

interface AddGoalFormProps {
  newGoal: NewGoal;
  setNewGoal: (goal: NewGoal) => void;
  onAdd: () => void;
  onCancel: () => void;
}

export default function AddGoalForm({
  newGoal,
  setNewGoal,
  onAdd,
  onCancel,
}: AddGoalFormProps) {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm">
      <h3 className="text-base font-medium text-slate-700 mb-4">
        Create new goal
      </h3>
      <div className="space-y-4">
        <div>
          <Label className="text-xs text-slate-500 mb-2 block font-normal">
            Title
          </Label>
          <Input
            placeholder="e.g., Read 12 books this year"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          />
        </div>
        <div>
          <Label className="text-xs text-slate-500 mb-2 block font-normal">
            Description
          </Label>
          <Textarea
            placeholder="What do you want to achieve?"
            value={newGoal.description}
            onChange={(e) =>
              setNewGoal({ ...newGoal, description: e.target.value })
            }
          />
        </div>
        <div>
          <Label className="text-xs text-slate-500 mb-2 block font-normal">
            Target date
          </Label>
          <Input
            type="date"
            value={newGoal.targetDate}
            onChange={(e) =>
              setNewGoal({ ...newGoal, targetDate: e.target.value })
            }
          />
        </div>
        <div className="flex gap-3">
          <Button onClick={onAdd} className="flex-1">
            Add Goal
          </Button>
          <Button onClick={onCancel} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  );
}
