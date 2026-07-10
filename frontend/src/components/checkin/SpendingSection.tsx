import Card from "../Card";
import Input from "../Input";
import Label from "../Label";

import type { CheckinData } from "../../types";

type SpendingSectionProps = {
  spending: CheckinData["spending"];
  onAmountChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onFinancialMoodChange: (value: string) => void;
};

export default function SpendingSection({
  spending,
  onAmountChange,
  onTypeChange,
  onFinancialMoodChange,
}: SpendingSectionProps) {
  const expenseTypes = ["necessary", "emotional"] as const;

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm">
      <Label className="text-base text-slate-700 mb-4 block">
        Spending reflection
      </Label>

      <div className="space-y-4 pt-2">
        <div>
          <Label
            htmlFor="amount"
            className="text-xs text-slate-500 mb-2 block font-normal"
          >
            Amount spent today
          </Label>

          <Input
            id="amount"
            placeholder="$0.00"
            value={spending.amount}
            onChange={(e) => onAmountChange(e.target.value)}
          />
        </div>

        <div>
          <Label className="text-xs text-slate-500 mb-2 block font-normal">
            Expense type
          </Label>

          <div className="flex gap-3">
            {expenseTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onTypeChange(type)}
                className={`flex-1 py-2.5 rounded-xl border-2 text-sm capitalize transition-all ${
                  spending.type === type
                    ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label
            htmlFor="financial-mood"
            className="text-xs text-slate-500 mb-2 block font-normal"
          >
            Financial mood
          </Label>

          <Input
            id="financial-mood"
            placeholder="e.g., comfortable, anxious, happy..."
            value={spending.financialMood}
            onChange={(e) => onFinancialMoodChange(e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
}
