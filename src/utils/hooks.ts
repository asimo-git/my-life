import {
  useState,
  useLayoutEffect,
  useMemo,
  useEffect,
  useCallback,
  type RefObject,
} from "react";
import { calculateEventPositions, calculatePeriodPositions } from "./utils";
import type { DateItem, EventPosition, PeriodPosition } from "./types";

export function useTimelineLength(dateOfBirth: number | null, scale: number) {
  const lifeSpan = useMemo(() => {
    return dateOfBirth ? Date.now() - dateOfBirth : 0;
  }, [dateOfBirth]);

  const timelineLength = useMemo(() => {
    if (!dateOfBirth) return 0;
    const baseLength = window.screen.height * 0.75;
    return baseLength * scale;
  }, [dateOfBirth, scale]);

  return {
    timelineLength,
    lifeSpan,
  };
}

/////////////////////////////////////////////////////////
export function useEventPositions(
  dateOfBirth: number | null,
  events: DateItem[],
  lifeSpan: number,
  timelineLength: number
) {
  const [eventPositions, setEventPositions] = useState<EventPosition>({
    singles: [],
    clusters: [],
  });

  useEffect(() => {
    if (dateOfBirth && timelineLength !== 0 && events.length > 0) {
      const result = calculateEventPositions(
        events,
        dateOfBirth,
        lifeSpan,
        timelineLength
      );
      setEventPositions(result);
    }
  }, [dateOfBirth, events, lifeSpan, timelineLength]);

  return eventPositions;
}
/////////////////////////////////////////////////////////////////
export function usePeriodPositions(
  dateOfBirth: number | null,
  periods: DateItem[],
  lifeSpan: number,
  timelineLength: number,
  containerRef: RefObject<HTMLDivElement | null>
) {
  const [periodPositions, setPeriodPositions] = useState<
    Map<string, PeriodPosition>
  >(new Map());

  useEffect(() => {
    if (dateOfBirth && timelineLength !== 0 && periods.length > 0) {
      const result = calculatePeriodPositions(
        periods,
        dateOfBirth,
        lifeSpan,
        timelineLength
      );
      setPeriodPositions(result);
    }
  }, [dateOfBirth, periods, lifeSpan, timelineLength]);

  const recalcLabels = useCallback(() => {
    if (!containerRef.current) return;

    const blocks =
      containerRef.current.querySelectorAll<HTMLDivElement>(".description");
    const blockMap = new Map<string, HTMLDivElement>();
    blocks.forEach((block) => {
      const id = block.dataset.periodId;
      if (id) blockMap.set(id, block);
    });

    setPeriodPositions((prev) => {
      const updated = new Map(prev);
      let sum = 0;

      for (const [id, pos] of prev.entries()) {
        const block = blockMap.get(id);
        if (!block) continue;

        const height = block.getBoundingClientRect().height;
        const newLabelTop = sum > pos.startPos ? sum - pos.startPos : 0;

        sum =
          pos.startPos > sum ? pos.startPos + height + 10 : sum + height + 10;

        updated.set(id, { ...pos, labelTop: newLabelTop });
      }

      return updated;
    });
  }, [containerRef]);

  useLayoutEffect(() => {
    if (periodPositions.size === 0) return;
    const raf = requestAnimationFrame(recalcLabels);
    return () => cancelAnimationFrame(raf);
  }, [periods, recalcLabels]);

  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const observer = new ResizeObserver(() => {
      setTimeout(recalcLabels, 10);
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, [containerRef, recalcLabels]);

  return periodPositions;
}
