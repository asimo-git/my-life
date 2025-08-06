import { useDispatch } from "react-redux";
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";
import { getDayTimestamp } from "../../../utils";
import { useEffect, useState } from "react";
import { addItem } from "../../../redux/datesSlice";
import styles from "./DateLine.module.css";

export default function DateLine({
  initialDate,
  initialDescription,
}: {
  initialDate: number;
  initialDescription: string;
}) {
  const [date, setDate] = useState(initialDate);
  const [description, setDescription] = useState(initialDescription);

  const dispatch = useDispatch();

  useEffect(() => {
    if (date && description) dispatch(addItem([date, description]));
  }, [date, description]);

  return (
    <div className={styles.dateLine}>
      <Flatpickr
        value={new Date(date)}
        onChange={([date]) => setDate(date ? getDayTimestamp(date) : 0)}
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
