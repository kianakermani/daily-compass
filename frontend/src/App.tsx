// React
import { useEffect, useState } from "react";

// Router
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";

// Icons
import {
  Calendar,
  CheckCircle2,
  Circle,
  Compass,
  Plus,
  Save,
  Smile,
  Target,
  Trash2,
  TrendingUp,
} from "lucide-react";

// Charts
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Notifications
import { toast, Toaster } from "sonner";

// Components
import Button from "./components/Button";
import Card from "./components/Card";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";
import Label from "./components/Label";
import Progress from "./components/Progress";
import Slider from "./components/Slider";
import Textarea from "./components/Textarea";

// Types
import type { CheckinData, Goal } from "./types";

// Constants
import { moodOptions } from "./constants/moodOptions";
import { navItems } from "./constants/navItems";

//today checkin
function TodayCheckin() {
  const today = new Date().toISOString().split("T")[0];
  const [data, setData] = useState<CheckinData>({
    date: today,
    moodScore: 5,
    mainMood: "",
    isStressed: false,
    isTired: false,
    habits: { water: false, walking: false, reading: false, skincare: false },
    spending: { amount: "", type: "", financialMood: "" },
    bestPart: "",
    worstPart: "",
    notes: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem(`checkin-${today}`);
    if (saved) setData(JSON.parse(saved));
  }, [today]);

  const handleSave = () => {
    const checkins: CheckinData[] = JSON.parse(
      localStorage.getItem("checkins") || "[]",
    );
    const idx = checkins.findIndex((c) => c.date === today);
    if (idx >= 0) checkins[idx] = data;
    else checkins.push(data);
    localStorage.setItem("checkins", JSON.stringify(checkins));
    localStorage.setItem(`checkin-${today}`, JSON.stringify(data));
    toast.success("Check-in saved!");
  };

  const set = (patch: Partial<CheckinData>) =>
    setData((d) => ({ ...d, ...patch }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium text-slate-800 mb-1">
          Today's Check-in
        </h2>
        <p className="text-slate-500 text-sm">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Mood Score */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <div className="space-y-4">
          <Label className="text-base text-slate-700">
            How are you feeling today?
          </Label>
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Not great</span>
              <span className="text-3xl font-light text-indigo-600">
                {data.moodScore}
              </span>
              <span className="text-sm text-slate-400">Amazing</span>
            </div>
            <Slider
              value={[data.moodScore]}
              onValueChange={(v) => set({ moodScore: v[0] })}
              min={1}
              max={10}
              step={1}
            />
            <div className="flex justify-between text-xs text-slate-300 px-0.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Main Mood */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <Label className="text-base text-slate-700 mb-4 block">Main mood</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {moodOptions.map((mood) => {
            const Icon = mood.icon;
            return (
              <button
                key={mood.value}
                onClick={() => set({ mainMood: mood.value })}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  data.mainMood === mood.value
                    ? "border-indigo-400 bg-indigo-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${mood.color}`} />
                <span className="text-sm text-slate-700">{mood.label}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Stress & Tiredness */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {(
            [
              { label: "Feeling stressed?", key: "isStressed" as const },
              { label: "Feeling tired?", key: "isTired" as const },
            ] as const
          ).map(({ label, key }) => (
            <div key={key} className="flex items-center justify-between">
              <Label className="text-slate-700">{label}</Label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={data[key] ? "default" : "outline"}
                  onClick={() => set({ [key]: true })}
                >
                  Yes
                </Button>
                <Button
                  size="sm"
                  variant={!data[key] ? "default" : "outline"}
                  onClick={() => set({ [key]: false })}
                >
                  No
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Habits */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <Label className="text-base text-slate-700 mb-4 block">
          Daily habits
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {(
            [
              { key: "water", label: "💧 Drink water" },
              { key: "walking", label: "🚶 Walking" },
              { key: "reading", label: "📚 Reading" },
              { key: "skincare", label: "✨ Skincare" },
            ] as const
          ).map(({ key, label }) => (
            <div key={key} className="flex items-center space-x-3">
              <Checkbox
                id={key}
                checked={data.habits[key]}
                onCheckedChange={(checked) =>
                  set({ habits: { ...data.habits, [key]: checked } })
                }
              />
              <Label htmlFor={key} className="cursor-pointer">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      {/* Spending */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <Label className="text-base text-slate-700 mb-4 block">
          Spending reflection
        </Label>
        <div className="space-y-4 pt-2">
          <div>
            <Label
              htmlFor="amount"
              className="text-xs text-slate-500 mb-2 block font-normal"
            >
              Amount spent today
            </Label>
            <Input
              id="amount"
              placeholder="$0.00"
              value={data.spending.amount}
              onChange={(e) =>
                set({ spending: { ...data.spending, amount: e.target.value } })
              }
            />
          </div>
          <div>
            <Label className="text-xs text-slate-500 mb-2 block font-normal">
              Expense type
            </Label>
            <div className="flex gap-3">
              {["necessary", "emotional"].map((type) => (
                <button
                  key={type}
                  onClick={() => set({ spending: { ...data.spending, type } })}
                  className={`flex-1 py-2.5 rounded-xl border-2 text-sm capitalize transition-all ${
                    data.spending.type === type
                      ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label
              htmlFor="financial-mood"
              className="text-xs text-slate-500 mb-2 block font-normal"
            >
              Financial mood
            </Label>
            <Input
              id="financial-mood"
              placeholder="e.g., comfortable, anxious, happy..."
              value={data.spending.financialMood}
              onChange={(e) =>
                set({
                  spending: { ...data.spending, financialMood: e.target.value },
                })
              }
            />
          </div>
        </div>
      </Card>

      {/* Best & Worst */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <div className="space-y-4">
          <div>
            <Label htmlFor="best-part" className="text-slate-700 mb-2 block">
              Best part of the day
            </Label>
            <Textarea
              id="best-part"
              placeholder="What made you smile today?"
              value={data.bestPart}
              onChange={(e) => set({ bestPart: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="worst-part" className="text-slate-700 mb-2 block">
              Worst part of the day
            </Label>
            <Textarea
              id="worst-part"
              placeholder="What was challenging?"
              value={data.worstPart}
              onChange={(e) => set({ worstPart: e.target.value })}
            />
          </div>
        </div>
      </Card>

      {/* Notes */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <Label htmlFor="notes" className="text-slate-700 mb-2 block">
          Additional notes
        </Label>
        <Textarea
          id="notes"
          placeholder="Anything else on your mind..."
          value={data.notes}
          onChange={(e) => set({ notes: e.target.value })}
          className="min-h-32"
        />
      </Card>

      <Button onClick={handleSave} size="lg" className="w-full py-4 text-base">
        <Save className="w-5 h-5 mr-2" />
        Save Check-in
      </Button>
    </div>
  );
}

//History
function History() {
  const [checkins, setCheckins] = useState<CheckinData[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("checkins");
    if (saved) {
      const data: CheckinData[] = JSON.parse(saved);
      data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setCheckins(data);
    }
  }, []);

  const chartData = [...checkins].reverse().map((c) => ({
    date: new Date(c.date + "T12:00:00").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    mood: c.moodScore,
  }));

  const avgMood =
    checkins.length > 0
      ? (
          checkins.reduce((s, c) => s + c.moodScore, 0) / checkins.length
        ).toFixed(1)
      : "—";

  const habitPct =
    checkins.length > 0
      ? Math.round(
          (checkins.reduce(
            (s, c) => s + Object.values(c.habits).filter(Boolean).length,
            0,
          ) /
            (checkins.length * 4)) *
            100,
        )
      : 0;

  const stats = [
    {
      label: "Total check-ins",
      value: checkins.length,
      bg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      Icon: Calendar,
    },
    {
      label: "Average mood",
      value: avgMood,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      Icon: Smile,
    },
    {
      label: "Habit completion",
      value: `${habitPct}%`,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      Icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium text-slate-800 mb-1">History</h2>
        <p className="text-sm text-slate-500">Your journey so far</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, bg, iconColor, Icon }) => (
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

      {chartData.length > 0 && (
        <Card className="p-6 bg-white/80 backdrop-blur-sm">
          <h3 className="text-base font-medium text-slate-700 mb-4">
            Mood trend
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
              <YAxis domain={[1, 10]} stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={{ fill: "#6366f1", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      <div>
        <h3 className="text-base font-medium text-slate-700 mb-4">
          Recent check-ins
        </h3>
        <div className="space-y-3">
          {checkins.length === 0 ? (
            <Card className="p-10 bg-white/80 backdrop-blur-sm text-center">
              <p className="text-slate-400 text-sm">
                No check-ins yet. Start tracking today!
              </p>
            </Card>
          ) : (
            checkins.slice(0, 10).map((c) => {
              const MoodIcon =
                moodOptions.find((m) => m.value === c.mainMood)?.icon ?? Smile;
              return (
                <Card
                  key={c.date}
                  className="p-5 bg-white/80 backdrop-blur-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <MoodIcon className="w-6 h-6 text-indigo-600" />
                      </div>
                      <p className="text-xl font-light text-indigo-600">
                        {c.moodScore}
                      </p>
                      <p className="text-xs text-slate-400">
                        {new Date(c.date + "T12:00:00").toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {c.mainMood && (
                          <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-xs">
                            {c.mainMood}
                          </span>
                        )}
                        {c.isStressed && (
                          <span className="px-2.5 py-0.5 bg-red-50 text-red-600 rounded-full text-xs">
                            Stressed
                          </span>
                        )}
                        {c.isTired && (
                          <span className="px-2.5 py-0.5 bg-orange-50 text-orange-600 rounded-full text-xs">
                            Tired
                          </span>
                        )}
                      </div>
                      {c.bestPart && (
                        <p className="text-sm text-slate-600 line-clamp-2">
                          <span className="text-xs text-slate-400 mr-1">
                            Best:
                          </span>
                          {c.bestPart}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1.5">
                        {Object.entries(c.habits)
                          .filter(([, done]) => done)
                          .map(([habit]) => (
                            <span
                              key={habit}
                              className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs"
                            >
                              {habit}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

//Goals
function Goals() {
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

//Layout & Router
function Layout() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-400 to-blue-500 flex items-center justify-center shadow-sm">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-medium text-slate-800 tracking-tight">
              Daily Compass
            </h1>
          </div>
          <nav className="flex gap-1.5 bg-white/60 backdrop-blur-sm rounded-2xl p-1.5 shadow-sm border border-white/80">
            {navItems.map(({ path, label, icon: Icon }) => {
              const active =
                path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(path);
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
      <Toaster position="bottom-center" richColors />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: TodayCheckin },
      { path: "history", Component: History },
      { path: "goals", Component: Goals },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
