import type { DateItem, PeriodPosition } from "../../../utils/types";
import styles from "./PeriodBlock.module.css";

export default function PeriodBlock({
  item,
  position,
}: {
  item: DateItem;
  position: PeriodPosition;
}) {
  return (
    <div
      className={styles.periodBlock}
      style={{
        top: `${position.startPos}px`,
        height: `${position.endPos - position.startPos}px`,
        borderTop: `2px solid ${item.color}B3`,
      }}
    >
      <div
        className={styles.periodDescription}
        style={{
          marginTop: position.shiftDescription ? "-25px" : undefined,
        }}
      >
        {item.description}
      </div>
      <div
        className={styles.timelinePeriod}
        key={item.id}
        style={{
          backgroundColor: `${item.color}B3`,
          width: `${30 + (position.widthOffset || 0)}px`,
        }}
      >
        <div className={styles.tooltip}>
          {`${new Date(item.timestamp[0]).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })} - ${new Date(item.timestamp[1]).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}`}
        </div>
      </div>
    </div>
  );
}
