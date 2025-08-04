import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { getDayTimestamp } from "../../../utils";
import { useEffect, useState } from "react";
import { addItem } from "../../../redux/datesSlice";

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
  });

  return (
    <div className="date-line">
      <DatePicker
        className="datepicker-input"
        selected={new Date(date)}
        onChange={(date) => setDate(date ? getDayTimestamp(date) : 0)}
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        placeholderText="Введите дату"
        dropdownMode="select"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
}
