import { useDispatch, useSelector } from "react-redux";
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";
import { getDayTimestamp } from "../../../utils/utils";
import { useEffect, useState } from "react";
import { deleteItem, updateItem } from "../../../redux/datesSlice";
import styles from "./DateLine.module.css";
import type { RootState } from "../../../redux/store";
import X from "../../../assets/icons/x.svg?react";

export default function DateLine({
  id,
  initialTimestamp,
  initialDescription,
  initialColor,
  mode,
}: {
  id: string;
  initialTimestamp: number[];
  initialDescription: string;
  initialColor: string;
  mode: "range" | "date";
}) {
  const [date, setDate] = useState(initialTimestamp);
  const [description, setDescription] = useState(initialDescription);
  const [color, setColor] = useState(initialColor);
  const dateOfBirth = useSelector(
    (state: RootState) => state.dates.dateOfBirth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateItem({ id, timestamp: date, description, color }));
  }, [date, description, color]);

  return (
    <div className={styles.dateLine}>
      <button
        className={`icon-button ${styles.deleteBtn}`}
        onClick={() => dispatch(deleteItem({ id, mode }))}
        title="Удалить"
      >
        <X />
      </button>

      <Flatpickr
        value={new Date(date[0])}
        onChange={(dates) =>
          typeof date === "number"
            ? setDate([getDayTimestamp(dates[0])])
            : setDate((prevDate) => [getDayTimestamp(dates[0]), prevDate[1]])
        }
        options={{
          dateFormat: "d.m.Y",
          minDate: new Date(dateOfBirth ?? "1000-01-01T00:00:00Z"),
          maxDate: new Date(),
        }}
      />

      {mode === "range" && (
        <Flatpickr
          value={new Date(date[1])}
          onChange={(dates) =>
            setDate((prevDate) => [prevDate[0], getDayTimestamp(dates[0])])
          }
          options={{
            dateFormat: "d.m.Y",
            minDate: new Date(date[0]),
            maxDate: new Date(),
          }}
        />
      )}

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
