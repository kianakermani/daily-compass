import { Compass, Calendar, Target } from "lucide-react";
import type { NavItem } from "../types";

export const navItems: NavItem[] = [
  {
    path: "/",
    label: "Today",
    icon: Compass,
  },
  {
    path: "/history",
    label: "History",
    icon: Calendar,
  },
  {
    path: "/goals",
    label: "Goals",
    icon: Target,
  },
];
