import { useState } from "react";
import Pencil from "../../assets/icons/pencil.svg?react";
import Check from "../../assets/icons/check.svg?react";
import Cancel from "../../assets/icons/x.svg?react";
import "./ChartDataPanel.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import DatePicker from "react-datepicker";
import { updateDateOfBirth } from "../../redux/datesSlice";

export default function ChartDataPanel() {
  const dateOfBirth = useSelector(
    (state: RootState) => state.dates.dateOfBirth
  );
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editingDateOfBirth, setEditingDateOfBirth] = useState<Date | null>(
    dateOfBirth ? new Date(dateOfBirth) : null
  );

  const handleSave = () => {
    if (editingDateOfBirth && !isNaN(editingDateOfBirth.getTime())) {
      dispatch(updateDateOfBirth(editingDateOfBirth));
      setIsEditing(false);
    }
  };

  return (
    <div className="data-panel">
      <h2>Дата рождения:</h2>
      <div className="date-container">
        {isEditing ? (
          <DatePicker
            className="datepicker-input"
            selected={editingDateOfBirth}
            onChange={(date) => setEditingDateOfBirth(date)}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            placeholderText="Введите дату рождения"
            dropdownMode="select"
          />
        ) : (
          <div>
            {dateOfBirth
              ? new Date(dateOfBirth).toLocaleDateString()
              : "Не указана"}
          </div>
        )}

        <div className="button-container">
          {isEditing ? (
            <>
              <button
                className="icon-button"
                disabled={
                  !editingDateOfBirth || isNaN(editingDateOfBirth.getTime())
                }
                onClick={handleSave}
              >
                <Check />
              </button>
              <button
                className="icon-button"
                onClick={() => setIsEditing(false)}
              >
                <Cancel />
              </button>
            </>
          ) : (
            <button className="icon-button" onClick={() => setIsEditing(true)}>
              <Pencil />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
