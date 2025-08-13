export function getDayTimestamp(date: Date): number {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime();
}

export function adjustDescriptions(
  positions: { pointPos: number; descPos: number }[],
  blockHeight: number
) {
  const adjusted = [...positions];
  for (let i = 1; i < adjusted.length; i++) {
    const prev = adjusted[i - 1];
    const curr = adjusted[i];

    if (curr.descPos < prev.descPos + blockHeight) {
      curr.descPos = prev.descPos + blockHeight;
    }
  }
  return adjusted;
}
