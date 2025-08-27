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
  const [isExiting, setIsExiting] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!dateOfBirth) return;

    setIsExiting(true);

    setTimeout(() => {
      dispatch(updateDateOfBirth(getDayTimestamp(dateOfBirth)));
    }, 1000);
  };

  return (
    <>
      <div
        className={`${styles.welcomeBlock} ${isExiting ? styles.exiting : ""}`}
      >
        <h1 className={styles.title}>Карта жизни</h1>
        <h2 className={styles.subtitle}>
          Позволит вам схематично и наглядно отобразить на едином отрезке
          главные события и периоды вашей жизни.
        </h2>
        <h2 className={styles.subtitle}>Для начала...</h2>
        <div className={styles.datepickerWrapper}>
          <Flatpickr
            className={styles.flatpickrInput}
            value={dateOfBirth ? new Date(dateOfBirth) : []}
            onChange={([date]) => setDateOfBirth(date)}
            placeholder="Выберите дату рождения"
            options={{
              dateFormat: "d.m.Y",
              defaultDate: new Date(1990, 0),
            }}
          />
          <button
            className={`icon-button ${styles.button}`}
            disabled={!dateOfBirth}
            onClick={handleSubmit}
          >
            <Check />
          </button>
        </div>
      </div>
    </>
  );
}
