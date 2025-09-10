import styles from "./MapField.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import EventBlock from "./EventBlock/EventBlock";
import PeriodBlock from "./PeriodBlock/PeriodBlock";
import Flag from "../../assets/icons/flag.svg?react";
import HerePoint from "../../assets/icons/here.svg?react";
import {
  useEventPositions,
  usePeriodPositions,
  useTimelineLength,
} from "../../utils/hooks";
import ClusterEventBlock from "./ClusterEventBlock/ClusterEventBlock";
import { useRef } from "react";

export default function MapField() {
  const dateOfBirth = useSelector(
    (state: RootState) => state.dates.dateOfBirth
  );
  const events = useSelector((state: RootState) => state.dates.events);
  const periods = useSelector((state: RootState) => state.dates.periods);
  const containerRef = useRef<HTMLDivElement>(null);

  const { timelineLength, lifeSpan } = useTimelineLength(dateOfBirth, events);

  const eventPositions = useEventPositions(
    dateOfBirth,
    events,
    lifeSpan,
    timelineLength
  );

  const periodPositions = usePeriodPositions(
    dateOfBirth,
    periods,
    lifeSpan,
    timelineLength,
    containerRef
  );

  return (
    <>
      <h1 className={styles.title}>Линия жизни</h1>
      <h4 className={styles.start}>Начало пути</h4>
      <Flag className={`${styles.flagIcon} ${styles.icon}`} />

      <div
        ref={containerRef}
        className={styles.mapContainer}
        style={{ height: timelineLength }}
      >
        {eventPositions.singles.map((item) => (
          <EventBlock
            key={item.event.id}
            item={item.event}
            position={item.position}
          />
        ))}

        {eventPositions.clusters.map((item) => (
          <ClusterEventBlock
            key={item.events[0].id}
            items={item.events}
            position={item.position}
          />
        ))}

        {periodPositions.map((item, index) => (
          <PeriodBlock
            key={periods[index]?.id || `period-${index}`}
            item={periods[index]}
            position={item}
          />
        ))}
      </div>

      <HerePoint className={`${styles.hereIcon} ${styles.icon}`} />
      <h4 className={styles.end}>Вы находитесь здесь</h4>
    </>
  );
}
