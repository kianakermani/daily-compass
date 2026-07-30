import Card from "../Card";

type HistoryStatsProps = {
  stats: {
    label: string;
    value: string | number;
    bg: string;
    iconColor: string;
    Icon: React.ElementType;
  }[];
};

export default function HistoryStats({ stats }: HistoryStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map(({ label, value, bg, iconColor, Icon }) => (
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
