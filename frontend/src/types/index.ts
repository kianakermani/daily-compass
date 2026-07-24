import type { LucideIcon } from "lucide-react";

export interface MoodOption {
  value: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

export interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

export interface CheckinData {
  date: string;
  moodScore: number;
  mainMood: string[];
  isStressed: boolean;
  isTired: boolean;
  habits: {
    water: boolean;
    walking: boolean;
    reading: boolean;
    skincare: boolean;
  };
  spending: {
    amount: string;
    type: string;
    financialMood: string;
  };
  bestPart: string;
  worstPart: string;
  notes: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  completed: boolean;
}
