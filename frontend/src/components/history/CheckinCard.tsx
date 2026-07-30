// Components
import Card from "../Card";

// Constants
import { moodOptions } from "../../constants/moodOptions";

// Types
import type { CheckinData } from "../../types";

// Icons
import { Smile } from "lucide-react";

type CheckinCardProps = {
  checkin: CheckinData;
};

export default function CheckinCard({ checkin }: CheckinCardProps) {
  return (
    <Card className="p-5 bg-white/80    hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center gap-1 flex-wrap p-1">
            {checkin.mainMood.length > 0 ? (
              checkin.mainMood.map((mood) => {
                const Icon =
                  moodOptions.find((m) => m.value === mood)?.icon ?? Smile;

                return <Icon key={mood} className="w-4 h-4 text-indigo-600" />;
              })
            ) : (
              <Smile className="w-6 h-6 text-indigo-600" />
            )}
          </div>

          <p className="text-xl font-light text-indigo-600">
            {checkin.moodScore}
          </p>

          <p className="text-xs text-slate-400">
            {new Date(checkin.date + "T12:00:00").toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {checkin.mainMood.map((mood) => (
              <span
                key={mood}
                className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-xs"
              >
                {moodOptions.find((m) => m.value === mood)?.label ?? mood}
              </span>
            ))}

            {checkin.isStressed && (
              <span className="px-2.5 py-0.5 bg-red-50 text-red-600 rounded-full text-xs">
                Stressed
              </span>
            )}

            {checkin.isTired && (
              <span className="px-2.5 py-0.5 bg-orange-50 text-orange-600 rounded-full text-xs">
                Tired
              </span>
            )}
          </div>

          {checkin.bestPart && (
            <p className="text-sm text-slate-600 line-clamp-2">
              <span className="text-xs text-slate-400 mr-1">Best:</span>
              {checkin.bestPart}
            </p>
          )}

          <div className="flex flex-wrap gap-1.5">
            {Object.entries(checkin.habits)
              .filter(([, done]) => done)
              .map(([habit]) => (
                <span
                  key={habit}
                  className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs"
                >
                  {habit}
                </span>
              ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
