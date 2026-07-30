import { CheckCircle2, Circle, Target } from "lucide-react";
import Card from "../Card";
import type { Goal } from "../../types";

interface GoalStatsProps {
  goals: Goal[];
}

export default function GoalStats({ goals }: GoalStatsProps) {
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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {statCards.map(({ label, value, bg, iconColor, Icon }) => (
        <Card key={label} className="p-5 bg-white/80   ">
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
  );
}
