import type { PeriodItem, PeriodPosition } from "../../../utils/types";
import styles from "./PeriodBlock.module.css";

export default function PeriodBlock({
  item,
  position,
}: {
  item: PeriodItem;
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
      ></div>
    </div>
  );
}
