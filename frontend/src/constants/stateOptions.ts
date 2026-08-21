import type { LucideIcon } from "lucide-react";
import {
  BatteryLow,
  Bed,
  Headphones,
  Pill,
  Thermometer,
  Move,
  Radio,
  AlertTriangle,
  Layers,
  Sliders,
  Flame,
  User,
  Cloud,
  Star,
} from "lucide-react";

export interface StateOption {
  value: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

export const physicalStateOptions: StateOption[] = [
  {
    value: "tired",
    label: "Tired",
    icon: Bed,
    color: "text-orange-500",
  },
  {
    value: "lowEnergy",
    label: "Low Energy",
    icon: BatteryLow,
    color: "text-slate-500",
  },
  {
    value: "headache",
    label: "Headache",
    icon: Headphones,
    color: "text-red-400",
  },
  {
    value: "feelingSick",
    label: "Feeling Sick",
    icon: Pill,
    color: "text-red-500",
  },
  {
    value: "bodyAche",
    label: "Body Ache",
    icon: Thermometer,
    color: "text-pink-500",
  },
  {
    value: "restless",
    label: "Restless",
    icon: Move,
    color: "text-purple-500",
  },
];

export const mentalStateOptions: StateOption[] = [
  {
    value: "stressed",
    label: "Stressed",
    icon: AlertTriangle,
    color: "text-red-500",
  },
  {
    value: "distracted",
    label: "Distracted",
    icon: Radio,
    color: "text-slate-500",
  },
  {
    value: "overwhelmed",
    label: "Overwhelmed",
    icon: Layers,
    color: "text-orange-600",
  },
  {
    value: "lowMotivation",
    label: "Low Motivation",
    icon: Sliders,
    color: "text-slate-600",
  },
  {
    value: "burnedOut",
    label: "Burned Out",
    icon: Flame,
    color: "text-orange-500",
  },
  {
    value: "lonely",
    label: "Lonely",
    icon: User,
    color: "text-slate-500",
  },
];

export const sleepOptions: StateOption[] = [
  {
    value: "good",
    label: "Good Sleep",
    icon: Star,
    color: "text-green-600",
  },
  {
    value: "poor",
    label: "Poor Sleep",
    icon: Cloud,
    color: "text-red-500",
  },
];