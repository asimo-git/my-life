import { useState, useLayoutEffect, useMemo, useRef, useEffect } from "react";
import { calculateEventPositions, calculatePeriodPositions } from "./utils";
import type { DateItem, EventPosition } from "./types";
import { CONTENT_HEIGHT_PX } from "./constants";

export function useTimeline(
  dateOfBirth: number | null,
  events: DateItem[],
  periods: DateItem[]
) {
  const [timelineLength, setTimelineLength] = useState<number>(0);
  const [eventPositions, setEventPositions] = useState<EventPosition>({
    singles: [],
    clusters: [],
  });
  const [periodPositions, setPeriodPositions] = useState<
    {
      shiftDescription: boolean;
      startPos: number;
      endPos: number;
      widthOffset: number;
    }[]
  >([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dateOfBirth || !containerRef.current) return;

    const basicLength = events.length * CONTENT_HEIGHT_PX;
    const length =
      basicLength < window.screen.height
        ? window.screen.height * 0.7
        : basicLength;
    setTimelineLength(length);
  }, [dateOfBirth, events]);

  const calculatedPositions = useMemo(() => {
    if (!dateOfBirth || !containerRef.current) return null;
    const lifeSpan = Date.now() - dateOfBirth;

    const calculatedEventPositions = calculateEventPositions(
      events,
      dateOfBirth,
      lifeSpan,
      timelineLength
    );

    const calculatedPeriodPositions = calculatePeriodPositions(
      periods,
      dateOfBirth,
      lifeSpan,
      timelineLength
    );

    return {
      eventPositions: calculatedEventPositions,
      periodPositions: calculatedPeriodPositions,
    };
  }, [dateOfBirth, events, periods, timelineLength]);

  useLayoutEffect(() => {
    if (calculatedPositions) {
      setEventPositions(calculatedPositions.eventPositions);
      setPeriodPositions(calculatedPositions.periodPositions);
    }
  }, [calculatedPositions]);

  return {
    timelineLength,
    eventPositions,
    periodPositions,
    containerRef,
  };
}
