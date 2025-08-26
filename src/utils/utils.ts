import { CONTENT_HEIGHT_PX } from "./constants";
import type { DateItem } from "./types";

export function getDayTimestamp(date: Date): number {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime();
}

export function adjustDescriptions(
  positions: { pointPos: number; descPos: number }[]
) {
  const adjusted = [...positions];
  for (let i = 1; i < adjusted.length; i++) {
    const prev = adjusted[i - 1];
    const curr = adjusted[i];

    if (curr.descPos < prev.descPos + CONTENT_HEIGHT_PX) {
      curr.descPos = prev.descPos + CONTENT_HEIGHT_PX;
    }
  }
  return adjusted;
}

export function calculateEventPositions(
  events: DateItem[],
  dateOfBirth: number,
  lifeSpan: number,
  timelineHeight: number
) {
  const pointPositions = events.map(
    (item) => ((item.timestamp[0] - dateOfBirth) / lifeSpan) * timelineHeight
  );

  const initialEventPositions = pointPositions.map((pos) => ({
    pointPos: pos,
    descPos: pos,
  }));

  return adjustDescriptions(initialEventPositions);
}

export function calculatePeriodPositions(
  periods: DateItem[],
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

  for (let i = 0; i < positions.length; i++) {
    const current = positions[i];

    let usedLevels = new Set<number>();
    for (let j = 0; j < i; j++) {
      const prev = positions[j];
      const overlap = prev.endPos > current.startPos;
      if (overlap) {
        usedLevels.add(prev.widthOffset / 10);
      }
    }

    let level = 0;
    while (usedLevels.has(level)) {
      level++;
    }
    current.widthOffset = level * 10;
  }

  const positionsWithShift = positions.map((pos, i, arr) => {
    let shiftDescription =
      i < arr.length - 1 && arr[i + 1].startPos - pos.startPos < 30;
    return { ...pos, shiftDescription };
  });

  return positionsWithShift;
}
