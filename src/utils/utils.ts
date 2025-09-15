import { CONTENT_HEIGHT_PX, EVENT_CLUSTER_THRESHOLD_PX } from "./constants";
import type {
  ClusterEventPosition,
  DateItem,
  EventPosition,
  SingleEventPosition,
} from "./types";

export function getDayTimestamp(date: Date): number {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime();
}

export function adjustDescriptions(positions: SingleEventPosition[]) {
  const adjusted = [...positions];
  for (let i = 1; i < adjusted.length; i++) {
    const prev = adjusted[i - 1];
    const curr = adjusted[i];

    if (
      curr.descriptionPosition <
      prev.descriptionPosition + CONTENT_HEIGHT_PX
    ) {
      curr.descriptionPosition = prev.descriptionPosition + CONTENT_HEIGHT_PX;
    }
  }
  return adjusted;
}

export function calculateEventPositions(
  events: DateItem[],
  dateOfBirth: number,
  lifeSpan: number,
  timelineHeight: number
): EventPosition {
  if (!events.length) return { singles: [], clusters: [] };

  const singles: SingleEventPosition[] = [];
  const clusters: ClusterEventPosition[] = [];

  const calcPos = (date: number) =>
    ((date - dateOfBirth) / lifeSpan) * timelineHeight;

  const withPos = events
    .map((event) => ({
      event,
      position: calcPos(event.timestamp[0]),
    }))
    .sort((a, b) => a.position - b.position);

  let cluster: typeof withPos = [withPos[0]];

  for (let i = 1; i < withPos.length; i++) {
    const prev = cluster[cluster.length - 1];
    const curr = withPos[i];

    if (curr.position - prev.position < EVENT_CLUSTER_THRESHOLD_PX) {
      cluster.push(curr);
    } else {
      if (cluster.length > 1) {
        clusters.push({
          position: cluster[0].position,
          events: cluster.map((c) => c.event),
        });
      } else {
        singles.push({
          pointPosition: cluster[0].position,
          descriptionPosition: cluster[0].position,
          event: cluster[0].event,
        });
      }
      cluster = [curr];
    }
  }

  if (cluster.length > 1) {
    clusters.push({
      position: cluster[0].position,
      events: cluster.map((c) => c.event),
    });
  } else {
    singles.push({
      pointPosition: cluster[0].position,
      descriptionPosition: cluster[0].position,
      event: cluster[0].event,
    });
  }

  const ajustSingles = adjustDescriptions(singles);

  return { singles: ajustSingles, clusters };
}

export function calculatePeriodPositions(
  periods: DateItem[],
  dateOfBirth: number,
  lifeSpan: number,
  timelineHeight: number
) {
  let positions = periods.map((item) => {
    const [start, end] = item.timestamp;
    const startPos = ((start - dateOfBirth) / lifeSpan) * timelineHeight;
    return {
      id: item.id,
      startPos,
      endPos: ((end - dateOfBirth) / lifeSpan) * timelineHeight,
      widthOffset: 0,
      labelTop: 0,
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

  return new Map(positions.map((pos) => [pos.id, pos]));
}
