import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";

// Components
import Button from "../components/Button";
import Card from "../components/Card";
import Checkbox from "../components/Checkbox";
import Input from "../components/Input";
import Label from "../components/Label";
import Slider from "../components/Slider";
import Textarea from "../components/Textarea";

// Types
import type { CheckinData } from "../types";

// Constants
import { moodOptions } from "../constants/moodOptions";

export default function TodayCheckin() {
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
