import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import Card from "../Card";
import { motion } from "framer-motion";

type MoodChartProps = {
  chartData: {
    date: string;
    mood: number;
  }[];
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    color?: string;
  }>;
  label?: string;
}

interface MoodLevel {
  label: string;
  color: string;
  gradientStart: string;
  gradientEnd: string;
  range: [number, number];
  description: string;
}

const MOOD_LEVELS: MoodLevel[] = [
  {
    label: "Low",
    color: "#ef4444",
    gradientStart: "#ef4444",
    gradientEnd: "#fca5a5",
    range: [1, 3],
    description: "Challenging day",
  },
  {
    label: "Neutral",
    color: "#f59e0b",
    gradientStart: "#f59e0b",
    gradientEnd: "#fde047",
    range: [4, 6],
    description: "Balanced mood",
  },
  {
    label: "Good",
    color: "#10b981",
    gradientStart: "#10b981",
    gradientEnd: "#34d399",
    range: [7, 9],
    description: "Positive vibes",
  },
  {
    label: "Excellent",
    color: "#6366f1",
    gradientStart: "#6366f1",
    gradientEnd: "#8b5cf6",
    range: [10, 10],
    description: "Great day!",
  },
];

const getMoodLevel = (score: number): MoodLevel => {
  return (
    MOOD_LEVELS.find((level) => score >= level.range[0] && score <= level.range[1]) ||
    MOOD_LEVELS[0]
  );
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!active || !payload || !payload.length) return null;

  const moodScore = payload[0].value;
  const moodLevel = getMoodLevel(moodScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-white/95 backdrop-blur-lg px-4 py-3 rounded-xl shadow-2xl border border-slate-100 text-sm font-medium relative z-50"
      style={{ minWidth: "200px" }}
    >
      <div className="flex items-center mb-2">
        <div
          className="w-3 h-3 rounded-full mr-2 animate-pulse"
          style={{ backgroundColor: moodLevel.color }}
        />
        <p className="text-slate-600 font-semibold">{label}</p>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400 mb-1">Mood Score</p>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-slate-800 mr-2">{moodScore}</span>
            <span className="text-slate-400 text-sm">/10</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 mb-1">Status</p>
          <span
            className="px-2 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: `${moodLevel.color}15`, color: moodLevel.color }}
          >
            {moodLevel.label}
          </span>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-2 italic">"{moodLevel.description}"</p>
    </motion.div>
  );
};

const MoodLegend = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-4 mb-2">
      {MOOD_LEVELS.map((level) => (
        <div key={level.label} className="flex items-center">
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: level.color }}
          />
          <span className="text-xs text-slate-600 font-medium">{level.label}</span>
          <span className="text-xs text-slate-400 ml-1">({level.range[0]}-{level.range[1]})</span>
        </div>
      ))}
    </div>
  );
};

export default function MoodChart({ chartData }: MoodChartProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (chartData.length === 0) {
    return (
      <Card className="p-6 bg-gradient-to-br from-slate-50/90 to-white/90 border border-slate-100 shadow-lg rounded-2xl">
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📊</div>
          <h3 className="text-sm font-semibold text-slate-700">No Mood Data</h3>
          <p className="text-xs text-slate-400 mt-1">
            Start tracking your mood to see insights here
          </p>
        </div>
      </Card>
    );
  }

  const chartHeight = isMobile ? 180 : 260;
  const marginLeft = isMobile ? -15 : -25;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-br from-slate-50/90 to-white/90 border border-slate-100 shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 tracking-tight">Mood Insights</h3>
            <p className="text-xs text-slate-500 mt-1">
              Track your emotional journey over time
            </p>
          </div>
          <div className="mt-2 sm:mt-0">
            <div className="flex items-center text-xs text-slate-500">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500 mr-2 animate-pulse" />
              <span className="font-medium">Interactive Chart</span>
            </div>
          </div>
        </div>

        <MoodLegend />

        <ResponsiveContainer width="100%" height={chartHeight}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: marginLeft, bottom: 0 }}
          >
            <defs>
              {/* Mood level gradient definitions */}
              {MOOD_LEVELS.map((level) => (
                <linearGradient
                  key={level.label}
                  id={`gradient-${level.label}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={level.gradientStart} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={level.gradientEnd} stopOpacity={0.05} />
                </linearGradient>
              ))}
            </defs>

            {/* Subtle grid lines */}
            <CartesianGrid
              vertical={false}
              stroke="#e2e8f0"
              strokeDasharray="3 3"
              strokeOpacity={0.5}
            />

            {/* Mood level reference areas */}
            <ReferenceArea
              y1={1}
              y2={3}
              fill="#fee2e2"
              fillOpacity={0.2}
              stroke="none"
            />
            <ReferenceArea
              y1={4}
              y2={6}
              fill="#fef3c7"
              fillOpacity={0.2}
              stroke="none"
            />
            <ReferenceArea
              y1={7}
              y2={10}
              fill="#d1fae5"
              fillOpacity={0.2}
              stroke="none"
            />

            {/* Mood level reference lines */}
            <ReferenceLine y={3} stroke="#fca5a5" strokeWidth={1} strokeDasharray="3 3" />
            <ReferenceLine y={6} stroke="#fbbf24" strokeWidth={1} strokeDasharray="3 3" />
            <ReferenceLine y={9} stroke="#34d399" strokeWidth={1} strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: isMobile ? 10 : 11,
                fontWeight: 500,
              }}
              dy={10}
              interval={isMobile ? "preserveEnd" : 0}
            />

            <YAxis
              domain={[1, 10]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: isMobile ? 10 : 11,
                fontWeight: 500,
              }}
              ticks={[1, 3, 6, 9, 10]}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#cbd5e1",
                strokeWidth: 1.5,
                strokeDasharray: "4 4",
              }}
            />

            {/* Main area with dynamic coloring based on mood level */}
            <Area
              type="monotone"
              dataKey="mood"
              stroke="url(#linearGradient)"
              strokeWidth={3}
              fillOpacity={0.8}
              fill="url(#main-gradient)"
              dot={(props) => {
                const moodLevel = getMoodLevel(props.payload.mood);
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={4}
                    fill={moodLevel.color}
                    stroke="#ffffff"
                    strokeWidth={2}
                    className="transition-all duration-200 hover:r-6"
                  />
                );
              }}
              activeDot={{
                r: 8,
                fill: "#ffffff",
                stroke: "#6366f1",
                strokeWidth: 3,
                className: "transition-all duration-200",
              }}
            />

            {/* Smooth gradient line */}
            <defs>
              <linearGradient id="linearGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="main-gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500 mr-2" />
              <span>Hover for detailed insights</span>
            </div>
            <div className="mt-2 sm:mt-0">
              <span className="text-slate-400">•</span>
              <span className="mx-2">Tap on mobile</span>
              <span className="text-slate-400">•</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
