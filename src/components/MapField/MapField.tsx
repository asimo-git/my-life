import { useEffect, useState } from "react";
import styles from "./MapField.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

export default function MapField() {
  const dateOfBirth = useSelector(
    (state: RootState) => state.dates.dateOfBirth
  );
  const events = useSelector((state: RootState) => state.dates.events);

  const [positionShifts, setPositionShifts] = useState<number[]>([]);
  const [lifeDuration, setLifeDuration] = useState<number>(0);
  const [timelineLength, setTimelineLength] = useState<string>("0");

  useEffect(() => {
    if (dateOfBirth) {
      setLifeDuration(Date.now() - dateOfBirth);
    }
  }, [dateOfBirth]);

  useEffect(() => {
    if (dateOfBirth) {
      const shifts = events.map((item) =>
        Math.round(((item.timestamp - dateOfBirth) / lifeDuration) * 100)
      );
      setPositionShifts(shifts);
      console.log(shifts);
    }
  }, [events]);

  useEffect(() => {
    const basicLength = events.length * 40;
    const length =
      basicLength < window.screen.height ? "80%" : `${basicLength}px`;
    setTimelineLength(length);
  }, [dateOfBirth, events]);

  return (
    <>
      <div className={styles.mapBlock}>
        <h1>My Map</h1>
        <div
          className={styles.mapContainer}
          style={{
            height: timelineLength,
          }}
        >
          {dateOfBirth && (
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>Начало пути</div>
            </div>
          )}
          {events.map((item, index) => (
            <div className={styles.timelineItem} key={item.id}>
              <div
                className={styles.timelineDot}
                style={{
                  top: `${positionShifts[index]}%`,
                  backgroundColor: item.color,
                }}
              ></div>
              <div
                className={styles.timelineContent}
                style={{
                  top: `${positionShifts[index]}%`,
                  transform:
                    index % 2 === 0
                      ? "translateX(100%) translateY(-50%)"
                      : "translateY(-50%)",
                }}
              >
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
