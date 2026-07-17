import { useEffect, useState } from "react";
import { toast } from "sonner";

import GoalsHeader from "../components/goals/GoalsHeader";
import AddGoalForm from "../components/goals/AddGoalForm";
import GoalStats from "../components/goals/GoalStats";
import ActiveGoals from "../components/goals/ActiveGoals";
import CompletedGoals from "../components/goals/CompletedGoals";
import EmptyGoals from "../components/goals/EmptyGoals";

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

  return (
    <div className="space-y-6">
      <GoalsHeader onToggleAdd={() => setIsAdding(!isAdding)} />

      {isAdding && (
        <AddGoalForm
          newGoal={newGoal}
          setNewGoal={setNewGoal}
          onAdd={handleAdd}
          onCancel={() => setIsAdding(false)}
        />
      )}

      <GoalStats goals={goals} />

      <ActiveGoals
        goals={active}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onProgress={handleProgress}
      />

      <CompletedGoals
        goals={done}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />

      {goals.length === 0 && !isAdding && (
        <EmptyGoals onCreateClick={() => setIsAdding(true)} />
      )}
    </div>
  );
}
