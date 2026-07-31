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
import { createDefaultCheckinData } from "../constants/defaultCheckinData";
import { saveCheckin, loadTodayCheckin } from "../utils/checkinStorage";

// Types
import type { CheckinData } from "../types";

export default function TodayCheckin() {
  const today = new Date().toISOString().split("T")[0];

  const [data, setData] = useState<CheckinData>(
    createDefaultCheckinData(today),
  );

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const saved = loadTodayCheckin(today);

    if (saved) {
      setData(saved);
    }
  }, [today]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) return;

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const handleSave = () => {
    saveCheckin(data);
    setIsDirty(false);
    toast.success("Check-in saved!");
  };

  const updateData = (patch: Partial<CheckinData>) => {
    setData((prev) => ({ ...prev, ...patch }));
    setIsDirty(true);
  };

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
          updateData({
            moodScore: value,
          })
        }
      />

      {/* Main Mood */}
      <MainMood
        mainMood={data.mainMood}
        onMainMoodChange={(value) => updateData({ mainMood: value })}
      />

      {/* Stress & Tiredness */}
      <StressSection
        isStressed={data.isStressed}
        isTired={data.isTired}
        onStressChange={(value) => updateData({ isStressed: value })}
        onTiredChange={(value) => updateData({ isTired: value })}
      />

      {/* Habits */}
      <HabitsSection
        habits={data.habits}
        onHabitChange={(habit, checked) =>
          updateData({
            habits: {
              ...data.habits,
              [habit]: checked,
            },
          })
        }
      />

      <SpendingSection
        spending={data.spending}
        onAmountChange={(value) =>
          updateData({
            spending: {
              ...data.spending,
              amount: value,
            },
          })
        }
        onCurrencyChange={(value) =>
          updateData({
            spending: {
              ...data.spending,
              currency: value,
            },
          })
        }
        onTypeChange={(value) =>
          updateData({
            spending: {
              ...data.spending,
              type: value,
            },
          })
        }
        onCategoriesChange={(value) =>
          updateData({
            spending: {
              ...data.spending,
              categories: value,
            },
          })
        }
        onFinancialMoodChange={(value) =>
          updateData({
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
        onBestPartChange={(value) => updateData({ bestPart: value })}
        onWorstPartChange={(value) => updateData({ worstPart: value })}
      />

      {/* Notes */}
      <NotesSection
        notes={data.notes}
        onNotesChange={(value) => updateData({ notes: value })}
      />

      <Button onClick={handleSave} size="lg" className="w-full py-4 text-base">
        <Save className="w-5 h-5 mr-2" />
        Save Check-in
      </Button>
    </div>
  );
}
