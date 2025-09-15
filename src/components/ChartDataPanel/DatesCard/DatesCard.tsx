// import styles from "./DatesCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import DateLine from "../DateLine/DateLine";
import type { AppDispatch, RootState } from "../../../redux/store";
import { addNewItemThunk } from "../../../redux/thunks";
import { AnimatePresence, motion } from "motion/react";

export default function DatesCard() {
  const dates = useSelector((state: RootState) => state.dates.events);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="card">
      <h2 className="subtitle">Важные даты</h2>
      <div className="date-container">
        <AnimatePresence>
          {dates.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <DateLine
                id={item.id}
                mode="date"
                initialTimestamp={item.timestamp}
                initialDescription={item.description}
                initialColor={item.color}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button
        className="main-button"
        onClick={() => dispatch(addNewItemThunk())}
      >
        Добавить
      </button>
    </div>
  );
}
