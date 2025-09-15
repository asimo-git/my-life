import { useState } from "react";
import styles from "./WelcomeBlock.module.css";
import { updateDateOfBirth } from "../../redux/datesSlice";
import { useDispatch } from "react-redux";
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";
import Check from "../../assets/icons/check.svg?react";
import { getDayTimestamp } from "../../utils/utils";
import { motion, type Variants } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.42, 0, 0.58, 1] },
  },
};

export default function WelcomeBlock() {
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!dateOfBirth) return;
    dispatch(updateDateOfBirth(getDayTimestamp(dateOfBirth)));
  };

  return (
    <>
      <motion.div
        className={styles.welcomeBlock}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={styles.title} variants={itemVariants}>
          Карта жизни
        </motion.h1>
        <motion.h2 className={styles.subtitle} variants={itemVariants}>
          Позволит вам схематично и наглядно отобразить на едином отрезке
          главные события и периоды вашей жизни.
        </motion.h2>
        <motion.h2 className={styles.subtitle} variants={itemVariants}>
          Для начала...
        </motion.h2>
        <motion.div
          className={styles.datepickerWrapper}
          variants={itemVariants}
        >
          <Flatpickr
            className={styles.flatpickrInput}
            value={dateOfBirth ? new Date(dateOfBirth) : []}
            onChange={([date]) => setDateOfBirth(date)}
            placeholder="Выберите дату рождения"
            options={{
              dateFormat: "d.m.Y",
              defaultDate: new Date(1990, 0),
            }}
          />
          <button
            className={`icon-button ${styles.button}`}
            disabled={!dateOfBirth}
            onClick={handleSubmit}
          >
            <Check />
          </button>
        </motion.div>
      </motion.div>
    </>
  );
}
