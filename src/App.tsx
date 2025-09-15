import { useEffect, useState } from "react";
import "./App.css";
import WelcomeBlock from "./components/WelcomeBlock/WelcomeBlock";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import ChartDataPanel from "./components/ChartDataPanel/ChartDataPanel";
import Chevron from "./assets/icons/chevron.svg?react";
import MapField from "./components/MapField/MapField";
import { AnimatePresence, motion } from "framer-motion";

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
        <aside className="sidebar">
          <ChartDataPanel />
        </aside>
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
          <AnimatePresence mode="wait">
            {!dateOfBirth && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <WelcomeBlock />
              </motion.div>
            )}

            {dateOfBirth && (
              <motion.div
                key="mapfield"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <MapField />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default App;
