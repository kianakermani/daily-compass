import {
  PartyPopper,
  Sun,
  Sofa,
  Waves,
  CircleHelp,
  CloudRain,
  Brain,
  Zap,
} from "lucide-react";

import type { MoodOption } from "../types";

export const moodOptions: MoodOption[] = [
  {
    value: "happy",
    label: "Happy",
    icon: Sun,
    color: "text-green-500",
  },
  {
    value: "calm",
    label: "Calm",
    icon: Waves,
    color: "text-blue-400",
  },
  {
    value: "joyful",
    label: "Joyful",
    icon: PartyPopper,
    color: "text-yellow-500",
  },
  {
    value: "content",
    label: "Content",
    icon: Sofa,
    color: "text-amber-600",
  },
  {
    value: "neutral",
    label: "Neutral",
    icon: CircleHelp,
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
    icon: Brain,
    color: "text-red-400",
  },
  {
    value: "angry",
    label: "Angry",
    icon: Zap,
    color: "text-red-600",
  },
];
