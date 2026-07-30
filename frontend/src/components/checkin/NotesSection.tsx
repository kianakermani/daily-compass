import Card from "../Card";
import Label from "../Label";
import Textarea from "../Textarea";

type NotesSectionProps = {
  notes: string;
  onNotesChange: (value: string) => void;
};

export default function NotesSection({
  notes,
  onNotesChange,
}: NotesSectionProps) {
  return (
    <Card className="p-6 bg-white/80   ">
      <Label htmlFor="notes" className="text-slate-700 mb-2 block">
        Additional notes
      </Label>

      <Textarea
        id="notes"
        placeholder="Anything else on your mind..."
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        className="min-h-32"
      />
    </Card>
  );
}
