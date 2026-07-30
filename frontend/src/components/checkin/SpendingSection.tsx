import Card from "../Card";
import Input from "../Input";
import Label from "../Label";

import type { CheckinData } from "../../types";

type ExpenseType = "necessary" | "emotional";

type Currency = "USD" | "EUR" | "TOMAN";

type SpendingSectionProps = {
  spending: CheckinData["spending"];
  onAmountChange: (value: string) => void;
  onCurrencyChange: (value: Currency) => void;
  onTypeChange: (value: ExpenseType[]) => void;
  onCategoriesChange: (value: string) => void;
  onFinancialMoodChange: (value: string) => void;
};

export default function SpendingSection({
  spending,
  onAmountChange,
  onCurrencyChange,
  onTypeChange,
  onCategoriesChange,
  onFinancialMoodChange,
}: SpendingSectionProps) {
  const expenseTypes = ["necessary", "emotional"] as const;
  const currencies: { value: Currency; label: string }[] = [
    { value: "USD", label: "Dollar" },
    { value: "EUR", label: "Euro" },
    { value: "TOMAN", label: "Toman" },
  ];

  const selectedTypes = Array.isArray(spending.type)
    ? spending.type
    : spending.type
      ? [spending.type]
      : [];

  const handleAmountChange = (value: string) => {
    if (value === "" || Number(value) >= 0) {
      onAmountChange(value);
    }
  };

  const handleTypeToggle = (type: ExpenseType) => {
    const nextTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((selectedType) => selectedType !== type)
      : [...selectedTypes, type];

    onTypeChange(nextTypes);
  };

  return (
    <Card className="p-6 bg-white/80   ">
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

          <div className="space-y-3">
            <Input
              id="amount"
              type="number"
              min="0"
              inputMode="decimal"
              placeholder="0.00"
              value={spending.amount}
              onChange={(e) => handleAmountChange(e.target.value)}
            />

            <div>
              <Label className="text-xs text-slate-500 mb-2 block font-normal">
                Currency
              </Label>

              <div className="flex gap-3">
                {currencies.map((currency) => {
                  const isSelected = spending.currency === currency.value;

                  return (
                    <button
                      key={currency.value}
                      type="button"
                      onClick={() => onCurrencyChange(currency.value)}
                      className={`cursor-pointer flex-1 py-2.5 rounded-xl border-2 text-sm font-medium    ${
                        isSelected
                          ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {currency.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-xs text-slate-500 mb-2 block font-normal">
            Expense type
          </Label>

          <div className="flex gap-3">
            {expenseTypes.map((type) => {
              const isSelected = selectedTypes.includes(type);

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTypeToggle(type)}
                  className={`cursor-pointer flex-1 py-2.5 rounded-xl border-2 text-sm capitalize    ${
                    isSelected
                      ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Label
            htmlFor="spending-categories"
            className="text-xs text-slate-500 mb-2 block font-normal"
          >
            Spending categories
          </Label>

          <textarea
            id="spending-categories"
            placeholder="e.g., food, transport, clothes..."
            value={spending.categories}
            onChange={(e) => onCategoriesChange(e.target.value)}
            className="h-24 w-full resize-none overflow-y-auto rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none    placeholder:text-slate-400 focus:border-indigo-400"
          />
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
