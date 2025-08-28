import BirthdayCard from "./BirthdayCard/BirthdayCard";
import styles from "./ChartDataPanel.module.css";
import DatesCard from "./DatesCard/DatesCard";
import PeriodsCard from "./PeriodsCard/PeriodsCard";

export default function ChartDataPanel() {
  return (
    <div className={styles.dataPanel}>
      <BirthdayCard />
      <DatesCard />
      <PeriodsCard />
    </div>
  );
}
