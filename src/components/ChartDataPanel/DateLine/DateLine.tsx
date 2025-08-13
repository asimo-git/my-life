import { useDispatch } from "react-redux";
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";
import { getDayTimestamp } from "../../../utils/utils";
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
  initialColor,
  mode,
}: {
  id: string;
  initialTimestamp: number | number[];
  initialDescription: string;
  initialColor: string;
  mode: "range" | "date";
}) {
  const [date, setDate] = useState(initialTimestamp);
  const [description, setDescription] = useState(initialDescription);
  const [color, setColor] = useState(initialColor);

  const dispatch = useDispatch();

  useEffect(() => {
    if (mode === "range" && Array.isArray(date)) {
      dispatch(updatePeriod({ id, timestamp: date, description, color }));
    } else if (typeof date === "number") {
      dispatch(updateItem({ id, timestamp: date, description, color }));
    }
  }, [date, description, color]);

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

      <input
        type="color"
        className={`${mode === "range" && styles.colorInputRange} ${
          styles.colorInput
        }`}
        value={color}
        onChange={(e) => setColor(e.target.value)}
        title="Выбрать цвет"
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
