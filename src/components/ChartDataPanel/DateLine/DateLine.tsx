import { useDispatch } from "react-redux";
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";
import { getDayTimestamp } from "../../../utils";
import { useEffect, useState } from "react";
import {
  deleteItem,
  updateItem,
  updatePeriod,
} from "../../../redux/datesSlice";
import styles from "./DateLine.module.css";

export default function DateLine({
  id,
  initialTimestamp,
  initialDescription,
  mode,
}: {
  id: string;
  initialTimestamp: number | number[];
  initialDescription: string;
  mode: "range" | "date";
}) {
  const [date, setDate] = useState(initialTimestamp);
  const [description, setDescription] = useState(initialDescription);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mode === "range" && Array.isArray(date)) {
      dispatch(updatePeriod({ id, timestamp: date, description }));
    } else if (typeof date === "number") {
      dispatch(updateItem({ id, timestamp: date, description }));
    }
  }, [date, description]);

  return (
    <div className={styles.dateLine}>
      <button
        className={`icon-button ${styles.deleteBtn}`}
        onClick={() => dispatch(deleteItem({ id, mode }))}
        title="Удалить"
      >
        ❌
      </button>

      <Flatpickr
        options={mode === "range" ? { mode: "range" } : undefined}
        className={mode === "range" ? styles.rangeInput : ""}
        value={
          typeof date === "number"
            ? new Date(date)
            : date.map((item) => new Date(item))
        }
        onChange={(dates) =>
          setDate(
            dates.length === 2
              ? dates.map((item) => getDayTimestamp(item))
              : getDayTimestamp(dates[0])
          )
        }
      />

      <textarea
        className={styles.description}
        placeholder="добавьте описание"
        rows={1}
        onFocus={(e) => {
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        onBlur={(e) => {
          e.target.style.height = "1.5em";
          setDescription(e.target.value);
        }}
        defaultValue={description}
      />
    </div>
  );
}
