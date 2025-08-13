import { useState } from "react";
import styles from "./WelcomeBlock.module.css";
import { updateDateOfBirth } from "../../redux/datesSlice";
import { useDispatch } from "react-redux";
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";
import Check from "../../assets/icons/check.svg?react";
import { getDayTimestamp } from "../../utils/utils";

export default function WelcomeBlock() {
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.welcomeBlock}>
        <h1 className={styles.title}>My Life</h1>
        <div className={styles.datepickerWrapper}>
          <Flatpickr
            className={styles.flatpickrInput}
            value={dateOfBirth ? new Date(dateOfBirth) : []}
            onChange={([date]) => setDateOfBirth(date)}
            placeholder="Введите дату рождения"
          />
          <button
            className={`icon-button ${styles.button}`}
            disabled={!dateOfBirth}
            onClick={() =>
              dateOfBirth &&
              dispatch(updateDateOfBirth(getDayTimestamp(dateOfBirth)))
            }
          >
            <Check />
          </button>
        </div>
      </div>
    </>
  );
}
