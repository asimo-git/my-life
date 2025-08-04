import { useState } from "react";
import "./WelcomeBlock.css";
import { updateDateOfBirth } from "../../redux/datesSlice";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Check from "../../assets/icons/check.svg?react";
import { getDayTimestamp } from "../../utils";

export default function WelcomeBlock() {
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const dispatch = useDispatch();

  return (
    <>
      <div className="welcome-block">
        <h1 className="title">My Life</h1>
        <div className="datepicker-wrapper">
          <DatePicker
            className="datepicker-input"
            onChange={(date) => setDateOfBirth(date)}
            selected={dateOfBirth}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            placeholderText="Введите дату рождения"
            dropdownMode="select"
          />
          <button
            className="icon-button datepicker-btn"
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
