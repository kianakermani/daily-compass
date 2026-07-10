import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";

// Components
import Button from "../components/Button";

import MoodScore from "../components/checkin/MoodScore";
import MainMood from "../components/checkin/MainMood";
import StressSection from "../components/checkin/StressSection";
import HabitsSection from "../components/checkin/HabitsSection";
import SpendingSection from "../components/checkin/SpendingSection";
import DayReflectionSection from "../components/checkin/DayReflectionSection";
import NotesSection from "../components/checkin/NotesSection";

// Types
import type { CheckinData } from "../types";

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

      {/* mood score */}
      <MoodScore
        moodScore={data.moodScore}
        onMoodScoreChange={(value) =>
          set({
            moodScore: value,
          })
        }
      />

      {/* Main Mood */}
      <MainMood
        mainMood={data.mainMood}
        onMainMoodChange={(value) => set({ mainMood: value })}
      />

      {/* Stress & Tiredness */}
      <StressSection
        isStressed={data.isStressed}
        isTired={data.isTired}
        onStressChange={(value) => set({ isStressed: value })}
        onTiredChange={(value) => set({ isTired: value })}
      />

      {/* Habits */}
      <HabitsSection
        habits={data.habits}
        onHabitChange={(habit, checked) =>
          set({
            habits: {
              ...data.habits,
              [habit]: checked,
            },
          })
        }
      />

      {/* Spending */}
      <SpendingSection
        spending={data.spending}
        onAmountChange={(value) =>
          set({
            spending: {
              ...data.spending,
              amount: value,
            },
          })
        }
        onTypeChange={(value) =>
          set({
            spending: {
              ...data.spending,
              type: value,
            },
          })
        }
        onFinancialMoodChange={(value) =>
          set({
            spending: {
              ...data.spending,
              financialMood: value,
            },
          })
        }
      />

      {/* Best & Worst */}
      <DayReflectionSection
        bestPart={data.bestPart}
        worstPart={data.worstPart}
        onBestPartChange={(value) => set({ bestPart: value })}
        onWorstPartChange={(value) => set({ worstPart: value })}
      />

      {/* Notes */}
      <NotesSection
        notes={data.notes}
        onNotesChange={(value) => set({ notes: value })}
      />

      <Button onClick={handleSave} size="lg" className="w-full py-4 text-base">
        <Save className="w-5 h-5 mr-2" />
        Save Check-in
      </Button>
    </div>
  );
}
