import { useEffect, useState } from "react";
import "./App.css";
import WelcomeBlock from "./components/WelcomeBlock/WelcomeBlock";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import ChartDataPanel from "./components/ChartDataPanel/ChartDataPanel";
import Chevron from "./assets/icons/chevron.svg?react";
import MapField from "./components/MapField/MapField";

function App() {
  const dateOfBirth = useSelector(
    (state: RootState) => state.dates.dateOfBirth
  );
  const [collapsed, setCollapsed] = useState(!dateOfBirth);

  useEffect(() => {
    setCollapsed(!dateOfBirth);
  }, [dateOfBirth]);

  return (
    <>
      <div className={`layout ${collapsed ? "closedSidebar" : ""}`}>
        <aside className="sidebar">{!collapsed && <ChartDataPanel />}</aside>
        <button
          className="collapse-button"
          onClick={() => {
            setCollapsed((prev) => !prev);
          }}
          disabled={!dateOfBirth}
        >
          {dateOfBirth && <Chevron className="chevron" />}
        </button>
        <div className="main">
          {dateOfBirth ? <MapField /> : <WelcomeBlock />}
        </div>
      </div>
    </>
  );
}

export default App;
