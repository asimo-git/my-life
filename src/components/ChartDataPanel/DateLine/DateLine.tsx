import { useDispatch } from "react-redux";
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";
import { getDayTimestamp } from "../../../utils";
import { useEffect, useState } from "react";
import { deleteItem, updateItem } from "../../../redux/datesSlice";
import styles from "./DateLine.module.css";

export default function DateLine({
  id,
  initialTimestamp,
  initialDescription,
}: {
  id: string;
  initialTimestamp: number;
  initialDescription: string;
}) {
  const [date, setDate] = useState(initialTimestamp);
  const [description, setDescription] = useState(initialDescription);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateItem({ id, timestamp: date, description }));
  }, [date, description]);

  return (
    <div className={styles.dateLine}>
      <button
        className={`icon-button ${styles.deleteBtn}`}
        onClick={() => dispatch(deleteItem(id))}
        title="Удалить"
      >
        ❌
      </button>
      <Flatpickr
        value={new Date(date)}
        onChange={([selectedDate]) =>
          setDate(selectedDate ? getDayTimestamp(selectedDate) : 0)
        }
      />

      <textarea
        className={styles.description}
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
