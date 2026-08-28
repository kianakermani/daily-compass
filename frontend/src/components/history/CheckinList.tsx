// Components
import CheckinCard from "./CheckinCard";
import EmptyHistory from "./EmptyHistory";

// Types
import type { CheckinData } from "../../types";

type CheckinListProps = {
  checkins: CheckinData[];
  onDelete: (date: string) => void;
};

export default function CheckinList({ checkins, onDelete }: CheckinListProps) {
  if (checkins.length === 0) {
    return <EmptyHistory />;
  }

  return (
    <div className="space-y-3">
      {checkins.slice(0, 10).map((checkin) => (
        <CheckinCard
          key={checkin.date}
          checkin={checkin}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
