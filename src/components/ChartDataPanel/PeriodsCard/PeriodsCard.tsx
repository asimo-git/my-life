// import styles from "./PeriodsCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import DateLine from "../DateLine/DateLine";
import type { AppDispatch, RootState } from "../../../redux/store";
import { addNewPeriodThunk } from "../../../redux/thunks";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function PeriodsCard() {
  const periods = useSelector((state: RootState) => state.dates.periods);
  const dispatch = useDispatch<AppDispatch>();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [periods.length]);

  return (
    <div className="card">
      <h2 className="subtitle">Периоды жизни</h2>
      <div className="date-container">
        <AnimatePresence>
          {periods.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <DateLine
                key={item.id}
                id={item.id}
                mode="range"
                initialTimestamp={item.timestamp}
                initialDescription={item.description}
                initialColor={item.color}
              />{" "}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button
        className="main-button"
        onClick={() => dispatch(addNewPeriodThunk())}
      >
        Добавить
      </button>
      <div ref={bottomRef} />
    </div>
  );
}
