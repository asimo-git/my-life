import BirthdayCard from "./BirthdayCard/BirthdayCard";
import "./ChartDataPanel.css";
import DatesCard from "./DatesCard/DatesCard";

export default function ChartDataPanel() {
  return (
    <div className="data-panel">
      <BirthdayCard />
      <DatesCard />
    </div>
  );
}
