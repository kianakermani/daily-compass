// Charts
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Components
import Card from "../Card";

type MoodChartProps = {
  chartData: {
    date: string;
    mood: number;
  }[];
};

export default function MoodChart({ chartData }: MoodChartProps) {
  if (chartData.length === 0) return null;

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm">
      <h3 className="text-base font-medium text-slate-700 mb-4">Mood trend</h3>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

          <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />

          <YAxis domain={[1, 10]} stroke="#94a3b8" fontSize={11} />

          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              fontSize: 12,
            }}
          />

          <Line
            type="monotone"
            dataKey="mood"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ fill: "#6366f1", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
