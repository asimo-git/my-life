// import styles from "./DatesCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import DateLine from "../DateLine/DateLine";
import type { AppDispatch, RootState } from "../../../redux/store";
import { addNewItemThunk } from "../../../redux/thunks";

export default function DatesCard() {
  const dates = useSelector((state: RootState) => state.dates.events);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="card">
      <h2 className="subtitle">Важные даты</h2>
      <div className="date-container">
        {dates.map((item) => (
          <DateLine
            key={item.id}
            id={item.id}
            mode="date"
            initialTimestamp={item.timestamp}
            initialDescription={item.description}
            initialColor={item.color}
          />
        ))}
      </div>
      <button
        className="icon-button light-button"
        onClick={() => dispatch(addNewItemThunk())}
      >
        Добавить
      </button>
    </div>
  );
}
