// import styles from "./DatesCard.module.css";
import DateLine from "../DateLine/DateLine";

export default function DatesCard() {
  // const dateOfBirth = useSelector(
  //   (state: RootState) => state.dates.dateOfBirth
  // );
  // const dispatch = useDispatch();

  return (
    <div className="card">
      <h2 className="subtitle">Важные даты</h2>
      <div className="date-container">
        <DateLine
          initialDate={16546546}
          initialDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        />
      </div>
    </div>
  );
}
