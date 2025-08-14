import { useEffect, useRef, useState } from "react";
import styles from "./MapField.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { CONTENT_HEIGHT_PX } from "../../utils/constants";
import { adjustDescriptions } from "../../utils/utils";

export default function MapField() {
  const dateOfBirth = useSelector(
    (state: RootState) => state.dates.dateOfBirth
  );
  const events = useSelector((state: RootState) => state.dates.events);
  const periods = useSelector((state: RootState) => state.dates.periods);

  const [eventPositions, setEventPositions] = useState<
    { pointPos: number; descPos: number }[]
  >([]);
  const [periodPositions, setPeriodPositions] = useState<
    {
      startPos: number;
      endPos: number;
      widthOffset: number;
      shiftDescription?: boolean;
    }[]
  >([]);
  const [timelineLength, setTimelineLength] = useState<string>("0");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const basicLength = events.length * CONTENT_HEIGHT_PX;
    const length =
      basicLength < window.screen.height ? "80%" : `${basicLength}px`;
    setTimelineLength(length);
  }, [dateOfBirth, events]);

  useEffect(() => {
    if (!dateOfBirth || !containerRef.current) return;
    const timelineHeightPx = containerRef.current.clientHeight;
    console.log(timelineHeightPx);
    const pointPositions = events.map(
      (item) =>
        ((item.timestamp - dateOfBirth) / (Date.now() - dateOfBirth)) *
        timelineHeightPx
    );

    const initialPositions = pointPositions.map((pos) => ({
      pointPos: pos,
      descPos: pos,
    }));

    const adjusted = adjustDescriptions(initialPositions, CONTENT_HEIGHT_PX);

    setEventPositions(adjusted);
  }, [events, dateOfBirth]);

  useEffect(() => {
    if (!dateOfBirth || !containerRef.current) return;

    const timelineHeightPx = containerRef.current.clientHeight;
    const lifeSpan = Date.now() - dateOfBirth;

    let positions = periods.map((item, idx) => {
      const [start, end] = item.timestamp;
      return {
        idx,
        startPos: ((start - dateOfBirth) / lifeSpan) * timelineHeightPx,
        endPos: ((end - dateOfBirth) / lifeSpan) * timelineHeightPx,
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
      if (i < arr.length - 1) {
        if (arr[i + 1].startPos - pos.startPos < 30) {
          shiftDescription = true;
        }
      }
      return { ...pos, shiftDescription };
    });

    setPeriodPositions(positionsWithShift);
  }, [periods, dateOfBirth]);

  return (
    <>
      <div className={styles.mapBlock}>
        <h1>My Map</h1>
        <div
          ref={containerRef}
          className={styles.mapContainer}
          style={{
            height: timelineLength,
          }}
        >
          {dateOfBirth && (
            <div className={styles.timelineItem}>
              <div className={styles.timelinePoint}></div>
              <div className={styles.timelineContent}>Начало пути</div>
            </div>
          )}

          {events.map((item, index) => {
            if (!eventPositions[index]) return null; // TODO loader
            return (
              <div className={styles.timelineItem} key={item.id}>
                <div
                  className={styles.timelinePoint}
                  style={{
                    top: `${eventPositions[index].pointPos}px`,
                    backgroundColor: item.color,
                  }}
                ></div>

                <svg
                  className={styles.leaderLine}
                  style={{
                    top: `${eventPositions[index].pointPos}px`,
                  }}
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="30"
                    y2={`${
                      eventPositions[index].descPos -
                      eventPositions[index].pointPos
                    }`}
                    stroke="#333"
                    strokeWidth="1"
                  />
                </svg>

                <div
                  className={styles.timelineContent}
                  style={{
                    top: `${eventPositions[index].descPos}px`,
                  }}
                >
                  {item.description}
                </div>
              </div>
            );
          })}

          {periods.map((item, index) => {
            if (!periodPositions[index]) return null;
            return (
              <div
                className={styles.periodBlock}
                style={{
                  top: `${periodPositions[index].startPos}px`,
                  height: `${
                    periodPositions[index].endPos -
                    periodPositions[index].startPos
                  }px`,
                  borderTop: `2px solid ${item.color}B3`,
                }}
              >
                <div
                  className={styles.periodDescription}
                  style={{
                    marginTop: periodPositions[index].shiftDescription
                      ? "-25px"
                      : undefined,
                  }}
                >
                  {item.description}
                </div>
                <div
                  className={styles.timelinePeriod}
                  key={item.id}
                  style={{
                    backgroundColor: `${item.color}B3`,
                    width: `${
                      30 + (periodPositions[index]?.widthOffset || 0)
                    }px`,
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
