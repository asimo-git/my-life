import { useState } from "react";
import "./WelcomeBlock.css";
import { updateDateOfBirth } from "../../redux/datesSlice";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Check from "../../assets/icons/check.svg?react";

export default function WelcomeBlock() {
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const dispatch = useDispatch();
  console.log(dateOfBirth);

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
            className="datepicker-btn"
            disabled={!dateOfBirth}
            onClick={() => dispatch(updateDateOfBirth(dateOfBirth))}
          >
            <Check />
          </button>
        </div>
      </div>
    </>
  );
}
