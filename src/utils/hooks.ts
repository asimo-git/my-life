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
  const [periodPositions, setPeriodPositions] = useState<PeriodPosition[]>([]);

  // расчёт позиций
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

  // пересчёт лейблов
  const recalcLabels = useCallback(() => {
    if (!containerRef.current) return;

    const blocks =
      containerRef.current.querySelectorAll<HTMLDivElement>(".description");

    setPeriodPositions((prev) => {
      let sum = 0;
      return prev.map((pos, index) => {
        const block = blocks[index];
        if (!block) return pos;

        const height = block.getBoundingClientRect().height;
        const newLabelTop = sum > pos.startPos ? sum - pos.startPos : 0;

        sum =
          pos.startPos > sum ? pos.startPos + height + 10 : sum + height + 10;

        return { ...pos, labelTop: newLabelTop };
      });
    });
  }, [containerRef]);

  // вызываем после рендера
  useLayoutEffect(() => {
    if (periodPositions.length > 0 && containerRef.current) {
      const frameId = requestAnimationFrame(recalcLabels);
      return () => cancelAnimationFrame(frameId);
    }
  }, [periods, recalcLabels]);

  // слушаем ресайз
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => {
      setTimeout(recalcLabels, 10);
    });
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [recalcLabels, containerRef]);

  return periodPositions;
}
