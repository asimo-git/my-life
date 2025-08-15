import { useState, useLayoutEffect, useMemo, useRef } from "react";
import { calculateEventPositions, calculatePeriodPositions } from "./utils";
import type { DateItem, PeriodItem } from "./types";

export function useTimeline(
  dateOfBirth: number | null,
  events: DateItem[],
  periods: PeriodItem[],
  contentHeight: number
) {
  const [timelineLength, setTimelineLength] = useState<string>("0");
  const [eventPositions, setEventPositions] = useState<any[]>([]);
  const [periodPositions, setPeriodPositions] = useState<any[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const calculatedPositions = useMemo(() => {
    if (!dateOfBirth || !containerRef.current) return null;

    const timelineHeightPx = containerRef.current.clientHeight;
    const lifeSpan = Date.now() - dateOfBirth;

    const calculatedEventPositions = calculateEventPositions(
      events,
      dateOfBirth,
      lifeSpan,
      timelineHeightPx,
      contentHeight
    );

    const calculatedPeriodPositions = calculatePeriodPositions(
      periods,
      dateOfBirth,
      lifeSpan,
      timelineHeightPx
    );

    return {
      eventPositions: calculatedEventPositions,
      periodPositions: calculatedPeriodPositions,
    };
  }, [dateOfBirth, events, periods, timelineLength, contentHeight]);

  useLayoutEffect(() => {
    if (!dateOfBirth || !containerRef.current) return;

    const basicLength = events.length * contentHeight;
    const length =
      basicLength < window.screen.height ? "80%" : `${basicLength}px`;
    setTimelineLength(length);
  }, [dateOfBirth, events, contentHeight]);

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
