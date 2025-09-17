import Flatpickr from "react-flatpickr";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { updateDateOfBirth } from "../../../redux/datesSlice";
import { getDayTimestamp } from "../../../utils/utils";
import styles from "./BirthdayCard.module.css";

export default function BirthdayCard() {
  const dateOfBirth = useSelector(
    (state: RootState) => state.dates.dateOfBirth
  );
  const dispatch = useDispatch();

  return (
    <div className={`card ${styles.flex}`}>
      <h2 className={`subtitle ${styles.title}`}>Дата рождения</h2>
      <Flatpickr
        value={dateOfBirth ? new Date(dateOfBirth) : ""}
        onChange={([date]) =>
          dispatch(updateDateOfBirth(getDayTimestamp(date)))
        }
        options={{
          dateFormat: "d.m.Y",
          disableMobile: true,
        }}
      />
    </div>
  );
}
