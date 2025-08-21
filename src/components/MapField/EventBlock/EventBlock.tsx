import type { DateItem, EventPosition } from "../../../utils/types";
import styles from "./EventBlock.module.css";

export default function EventBlock({
  item,
  position,
}: {
  item: DateItem;
  position: EventPosition;
}) {
  // if (!item.description) return null;

  return (
    <div className={styles.timelineItem} key={item.id}>
      <div
        className={styles.timelinePoint}
        style={{
          top: `${position.pointPos}px`,
          backgroundColor: item.color,
        }}
      >
        <div className={styles.tooltip}>
          {new Date(item.timestamp[0]).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      </div>

      {item.description && (
        <>
          <svg
            className={styles.leaderLine}
            style={{
              top: `${position.pointPos}px`,
            }}
          >
            <line
              x1="0"
              y1="0"
              x2="30"
              y2={`${position.descPos - position.pointPos}`}
              stroke={`${item.color}`}
              strokeWidth="1"
            />
          </svg>

          <div
            className={styles.timelineContent}
            style={{
              top: `${position.descPos}px`,
              border: `solid 2px ${item.color}`,
            }}
          >
            {item.description}
          </div>
        </>
      )}
    </div>
  );
}
