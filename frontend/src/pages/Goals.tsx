// React
import { useEffect, useState } from "react";

// Icons
import { CheckCircle2, Circle, Plus, Target, Trash2 } from "lucide-react";

// Notifications
import { toast } from "sonner";

// Components
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Label from "../components/Label";
import Textarea from "../components/Textarea";
import Progress from "../components/Progress";

// Types
import type { Goal } from "../types";

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    targetDate: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("goals");
    if (saved) setGoals(JSON.parse(saved));
  }, []);

  const persist = (updated: Goal[]) => {
    localStorage.setItem("goals", JSON.stringify(updated));
    setGoals(updated);
  };

  const handleAdd = () => {
    if (!newGoal.title.trim()) {
      toast.error("Please enter a goal title");
      return;
    }
    persist([
      ...goals,
      {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
        targetDate: newGoal.targetDate,
        progress: 0,
        completed: false,
      },
    ]);
    setNewGoal({ title: "", description: "", targetDate: "" });
    setIsAdding(false);
    toast.success("Goal added!");
  };

  const handleDelete = (id: string) => {
    persist(goals.filter((g) => g.id !== id));
    toast.success("Goal deleted");
  };

  const handleToggle = (id: string) => {
    persist(
      goals.map((g) =>
        g.id === id
          ? { ...g, completed: !g.completed, progress: g.completed ? 0 : 100 }
          : g,
      ),
    );
  };

  const handleProgress = (id: string, progress: number) => {
    persist(
      goals.map((g) =>
        g.id === id ? { ...g, progress, completed: progress === 100 } : g,
      ),
    );
  };

  const active = goals.filter((g) => !g.completed);
  const done = goals.filter((g) => g.completed);

  const statCards = [
    {
      label: "Total goals",
      value: goals.length,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      Icon: Target,
    },
    {
      label: "In progress",
      value: active.length,
      bg: "bg-orange-100",
      iconColor: "text-orange-600",
      Icon: Circle,
    },
    {
      label: "Completed",
      value: done.length,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      Icon: CheckCircle2,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium text-slate-800 mb-1">Goals</h2>
          <p className="text-sm text-slate-500">Track your personal goals</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)}>
          <Plus className="w-4 h-4 mr-1.5" />
          New Goal
        </Button>
      </div>

      {isAdding && (
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
                onChange={(e) =>
                  setNewGoal({ ...newGoal, title: e.target.value })
                }
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
              <Button onClick={handleAdd} className="flex-1">
                Add Goal
              </Button>
              <Button
                onClick={() => setIsAdding(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map(({ label, value, bg, iconColor, Icon }) => (
          <Card key={label} className="p-5 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div>
                <p className="text-2xl font-light text-slate-800">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {active.length > 0 && (
        <div>
          <h3 className="text-base font-medium text-slate-700 mb-4">
            Active goals
          </h3>
          <div className="space-y-4">
            {active.map((goal) => {
              const days = goal.targetDate
                ? Math.ceil(
                    (new Date(goal.targetDate).getTime() - Date.now()) /
                      (1000 * 60 * 60 * 24),
                  )
                : null;
              return (
                <Card
                  key={goal.id}
                  className="p-6 bg-white/80 backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-base font-medium text-slate-800 mb-1">
                        {goal.title}
                      </h4>
                      {goal.description && (
                        <p className="text-sm text-slate-500 mb-1">
                          {goal.description}
                        </p>
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
                      onClick={() => handleDelete(goal.id)}
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
                        onClick={() =>
                          handleProgress(
                            goal.id,
                            Math.max(0, goal.progress - 10),
                          )
                        }
                        className="flex-1"
                      >
                        −10%
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleProgress(
                            goal.id,
                            Math.min(100, goal.progress + 10),
                          )
                        }
                        className="flex-1"
                      >
                        +10%
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleToggle(goal.id)}
                        className="flex-1 bg-green-500 hover:bg-green-600"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Done
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {done.length > 0 && (
        <div>
          <h3 className="text-base font-medium text-slate-700 mb-4">
            Completed goals
          </h3>
          <div className="space-y-3">
            {done.map((goal) => (
              <Card
                key={goal.id}
                className="p-5 bg-white/80 backdrop-blur-sm opacity-70"
              >
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
                      onClick={() => handleToggle(goal.id)}
                      className="text-slate-300 hover:text-indigo-500 transition-colors p-1"
                    >
                      <Circle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(goal.id)}
                      className="text-slate-300 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {goals.length === 0 && !isAdding && (
        <Card className="p-12 bg-white/80 backdrop-blur-sm text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-indigo-500" />
          </div>
          <h3 className="text-base font-medium text-slate-700 mb-2">
            No goals yet
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            Start by creating your first goal
          </p>
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="w-4 h-4 mr-1.5" />
            Create Goal
          </Button>
        </Card>
      )}
    </div>
  );
}
