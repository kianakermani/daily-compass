export function formatLocalDate(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function msUntilNextMidnight(): number {
  const now = new Date();
  const midnight = new Date(now);

  midnight.setHours(24, 0, 0, 0);

  return midnight.getTime() - now.getTime();
}

export function scheduleAtMidnight(callback: () => void): () => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  const schedule = () => {
    timeoutId = setTimeout(() => {
      callback();
      schedule();
    }, msUntilNextMidnight());
  };

  schedule();

  return () => clearTimeout(timeoutId);
}
