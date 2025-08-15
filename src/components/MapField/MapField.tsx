import styles from "./MapField.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { CONTENT_HEIGHT_PX } from "../../utils/constants";
import EventBlock from "./EventBlock/EventBlock";
import PeriodBlock from "./PeriodBlock/PeriodBlock";
import Flag from "../../assets/icons/flag.svg?react";
import HerePoint from "../../assets/icons/here.svg?react";
import { useTimeline } from "../../utils/hooks";

export default function MapField() {
  const dateOfBirth = useSelector(
    (state: RootState) => state.dates.dateOfBirth
  );
  const events = useSelector((state: RootState) => state.dates.events);
  const periods = useSelector((state: RootState) => state.dates.periods);

  const { timelineLength, eventPositions, periodPositions, containerRef } =
    useTimeline(dateOfBirth, events, periods, CONTENT_HEIGHT_PX);

  return (
    <div className={styles.mapBlock}>
      <h1 className={styles.title}>Линия жизни</h1>

      <h4 className={styles.start}>Начало пути</h4>
      <Flag className={`${styles.flagIcon} ${styles.icon}`} />

      <div
        ref={containerRef}
        className={styles.mapContainer}
        style={{ height: timelineLength }}
      >
        {events.map((item, index) =>
          eventPositions[index] ? (
            <EventBlock
              key={item.id}
              item={item}
              position={eventPositions[index]}
            />
          ) : null
        )}

        {periods.map((item, index) =>
          periodPositions[index] ? (
            <PeriodBlock
              key={item.id}
              item={item}
              position={periodPositions[index]}
            />
          ) : null
        )}
      </div>

      <HerePoint className={`${styles.hereIcon} ${styles.icon}`} />
      <h4 className={styles.end}>Вы находитесь здесь</h4>
    </div>
  );
}
