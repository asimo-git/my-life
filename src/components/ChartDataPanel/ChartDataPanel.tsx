import BirthdayCard from "./BirthdayCard/BirthdayCard";
import "./ChartDataPanel.css";
import DatesCard from "./DatesCard/DatesCard";
import PeriodsCard from "./PeriodsCard/PeriodsCard";

export default function ChartDataPanel() {
  return (
    <div className="data-panel">
      <BirthdayCard />
      <DatesCard />
      <PeriodsCard />
    </div>
  );
}
