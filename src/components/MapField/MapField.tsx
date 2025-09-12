import styles from "./MapField.module.css";
import { useDispatch, useSelector } from "react-redux";
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
import { zoomIn, zoomOut } from "../../redux/scaleSlice";

export default function MapField() {
  const dateOfBirth = useSelector(
    (state: RootState) => state.dates.dateOfBirth
  );
  const events = useSelector((state: RootState) => state.dates.events);
  const periods = useSelector((state: RootState) => state.dates.periods);
  const scale = useSelector((state: RootState) => state.scale);
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const { timelineLength, lifeSpan } = useTimelineLength(dateOfBirth, scale);

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
      <div className={styles.header}>
        <h1 className={styles.title}>Линия жизни</h1>
        <div>Масштаб:</div>
        <button
          className={styles.zoomButton}
          onClick={() => dispatch(zoomOut())}
          disabled={scale < 0.6}
        >
          -
        </button>
        <button
          className={styles.zoomButton}
          disabled={scale > 5}
          onClick={() => dispatch(zoomIn())}
        >
          +
        </button>
      </div>

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
            event={item.event}
            pointPosition={item.pointPosition}
            descriptionPosition={item.descriptionPosition}
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
