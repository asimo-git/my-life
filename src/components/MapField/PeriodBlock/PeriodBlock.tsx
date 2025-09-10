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
        paddingRight: `${30 + position.widthOffset}px`,
      }}
    >
      <div
        className={`${styles.periodDescription} description`}
        style={{
          top: `${position.labelTop}px`,
          borderTop: `2px solid ${item.color}B3`,
        }}
      >
        {item.description}
      </div>

      {position.labelTop + position.startPos > position.endPos ? (
        <div
          className={styles.connector}
          style={{
            width: "5px",
            borderLeft: `2px solid ${item.color}`,
            right: `${25 + position.widthOffset}px`,
            top: `50%`,
            bottom: `${
              position.endPos - position.startPos - position.labelTop - 1.5
            }px`,
          }}
        ></div>
      ) : null}

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
