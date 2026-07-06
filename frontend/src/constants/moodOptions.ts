import {
  Sparkles,
  Smile,
  Sun,
  Zap,
  Coffee,
  Meh,
  CloudRain,
  Heart,
} from "lucide-react";

import type { MoodOption } from "../types";

export const moodOptions: MoodOption[] = [
  {
    value: "joyful",
    label: "Joyful",
    icon: Sparkles,
    color: "text-yellow-500",
  },
  {
    value: "happy",
    label: "Happy",
    icon: Smile,
    color: "text-green-500",
  },
  {
    value: "calm",
    label: "Calm",
    icon: Sun,
    color: "text-blue-400",
  },
  {
    value: "energetic",
    label: "Energetic",
    icon: Zap,
    color: "text-orange-500",
  },
  {
    value: "content",
    label: "Content",
    icon: Coffee,
    color: "text-amber-600",
  },
  {
    value: "neutral",
    label: "Neutral",
    icon: Meh,
    color: "text-slate-500",
  },
  {
    value: "sad",
    label: "Sad",
    icon: CloudRain,
    color: "text-indigo-400",
  },
  {
    value: "anxious",
    label: "Anxious",
    icon: Heart,
    color: "text-red-400",
  },
];
