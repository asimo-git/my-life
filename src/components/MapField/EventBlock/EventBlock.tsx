import type { DateItem, EventPosition } from "../../../utils/types";
import styles from "./EventBlock.module.css";

export default function EventBlock({
  item,
  position,
}: {
  item: DateItem;
  position: EventPosition;
}) {
  return (
    <div className={styles.timelineItem} key={item.id}>
      <div
        className={styles.timelinePoint}
        style={{
          top: `${position.pointPos}px`,
          backgroundColor: item.color,
        }}
      ></div>

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
          stroke="#333"
          strokeWidth="1"
        />
      </svg>

      <div
        className={styles.timelineContent}
        style={{
          top: `${position.descPos}px`,
        }}
      >
        {item.description}
      </div>
    </div>
  );
}
