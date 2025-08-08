import { useEffect, useState } from "react";
import "./App.css";

import WelcomeBlock from "./components/WelcomeBlock/WelcomeBlock";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
// import MapField from "./components/MapField/MapField";
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
      <div className="layout">
        <div className={`sidebar ${collapsed ? "closed" : ""}`}>
          {!collapsed && <ChartDataPanel />}
          <button
            className={`collapse-button ${collapsed ? "closed" : ""}`}
            onClick={() => {
              setCollapsed((prev) => !prev);
            }}
          >
            <Chevron className="chevron" />
          </button>
        </div>
        {dateOfBirth ? <MapField /> : <WelcomeBlock />}
      </div>
    </>
  );
}

export default App;
