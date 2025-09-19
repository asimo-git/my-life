import type { SingleEventPosition } from "../../../utils/types";
import styles from "./EventBlock.module.css";

export default function EventBlock({
  event,
  pointPosition,
  descriptionPosition,
}: SingleEventPosition) {
  return (
    <div className={styles.timelineItem}>
      <div
        className={styles.timelinePoint}
        tabIndex={0}
        style={{
          top: `${pointPosition}px`,
          backgroundColor: event.color,
        }}
      >
        <div className={styles.tooltip}>
          {new Date(event.timestamp[0]).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      </div>

      {event.description && (
        <>
          <svg
            className={styles.leaderLine}
            style={{
              top: `${pointPosition}px`,
            }}
          >
            <line
              x1="0"
              y1="0"
              x2="32"
              y2={`${descriptionPosition - pointPosition}`}
              stroke={`${event.color}`}
              strokeWidth="2"
            />
          </svg>

          <div
            className={styles.timelineContent}
            style={{
              top: `${descriptionPosition}px`,
              border: `solid 2px ${event.color}`,
            }}
          >
            {event.description}
          </div>
        </>
      )}
    </div>
  );
}
