import { useState } from "react";
import type { DateItem } from "../../../utils/types";
import styles from "./ClusterEventBlock.module.css";

export default function ClusterEventBlock({
  items,
  position,
}: {
  items: DateItem[];
  position: number;
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={styles.timelineItem}>
      <div
        className={styles.timelinePoint}
        style={{
          top: `${position}px`,
        }}
        onClick={() => {
          setOpenModal((prev) => !prev);
        }}
        onMouseOver={() => setOpenModal(true)}
        onMouseLeave={() => setOpenModal(false)}
      >
        <span>{items.length}</span>
      </div>

      {openModal && (
        <>
          <svg
            className={styles.leaderLine}
            style={{
              top: `${position}px`,
            }}
          >
            <line x1="0" y1="0" x2="30" y2="0" stroke="black" strokeWidth="3" />
          </svg>
          <div
            className={styles.clusterContent}
            style={{
              top: `${position}px`,
            }}
          >
            {items.map((item) => (
              <div
                className={styles.eventDescription}
                key={item.id}
                style={{
                  border: `solid 2px ${item.color}`,
                }}
              >
                <span className={styles.eventDate}>
                  {new Date(item.timestamp[0]).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </span>{" "}
                <span>{item.description}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
