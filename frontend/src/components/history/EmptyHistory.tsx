// Components
import Card from "../Card";

export default function EmptyHistory() {
  return (
    <Card className="p-10 bg-white/80    text-center">
      <p className="text-sm text-slate-400">
        No check-ins yet. Start tracking today!
      </p>
    </Card>
  );
}
