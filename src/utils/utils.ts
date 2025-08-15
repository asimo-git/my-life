import type { DateItem, PeriodItem } from "./types";

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

export function calculateEventPositions(
  events: DateItem[],
  dateOfBirth: number,
  lifeSpan: number,
  timelineHeight: number,
  contentHeight: number
) {
  const pointPositions = events.map(
    (item) => ((item.timestamp - dateOfBirth) / lifeSpan) * timelineHeight
  );

  const initialEventPositions = pointPositions.map((pos) => ({
    pointPos: pos,
    descPos: pos,
  }));

  return adjustDescriptions(initialEventPositions, contentHeight);
}

export function calculatePeriodPositions(
  periods: PeriodItem[],
  dateOfBirth: number,
  lifeSpan: number,
  timelineHeight: number
) {
  let positions = periods.map((item) => {
    const [start, end] = item.timestamp;
    return {
      startPos: ((start - dateOfBirth) / lifeSpan) * timelineHeight,
      endPos: ((end - dateOfBirth) / lifeSpan) * timelineHeight,
      widthOffset: 0,
    };
  });

  let active: typeof positions = [];
  for (const current of positions) {
    active = active.filter((p) => p.endPos > current.startPos);
    active.push(current);
    active.forEach((p, i) => {
      p.widthOffset = i * 10;
    });
  }

  const positionsWithShift = positions.map((pos, i, arr) => {
    let shiftDescription = false;
    if (i < arr.length - 1 && arr[i + 1].startPos - pos.startPos < 30) {
      shiftDescription = true;
    }
    return { ...pos, shiftDescription };
  });

  return positionsWithShift;
}
