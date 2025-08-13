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
        </div>
      </div>
    </>
  );
}
