import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { updateDateOfBirth } from "../../../redux/datesSlice";
import { getDayTimestamp } from "../../../utils";

export default function BirthdayCard() {
  const dateOfBirth = useSelector(
    (state: RootState) => state.dates.dateOfBirth
  );
  const dispatch = useDispatch();

  return (
    <div className="card">
      <h2 className="subtitle">Дата рождения</h2>
      <Flatpickr
        value={dateOfBirth ? new Date(dateOfBirth) : ""}
        onChange={([date]) =>
          dispatch(updateDateOfBirth(getDayTimestamp(date)))
        }
      />
    </div>
  );
}
