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
  physicalStates: string[];
  mentalStates: string[];
  sleepQuality: "good" | "poor" | null;
  habits: {
    water: boolean;
    healthyFood: boolean;
    exercise: boolean;
    walking: boolean;
    dancing: boolean;
    shower: boolean;
    skincare: boolean;
    selfCare: boolean;
    meditation: boolean;
    quietTime: boolean;
    rest: boolean;
    reading: boolean;
    hobby: boolean;
    sleepEarly: boolean;
  };
  spending: {
    amount: string;
    currency: "USD" | "EUR" | "TOMAN";
    type: ("necessary" | "emotional")[];
    categories: string;
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
