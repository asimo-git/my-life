import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

export default function ReduxProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    try {
      const savedState = localStorage.getItem("datesState");
      const savedScale = localStorage.getItem("scale");
      if (savedState) {
        store.dispatch({
          type: "dates/hydrate",
          payload: JSON.parse(savedState),
        });
      }
      if (savedScale) {
        store.dispatch({
          type: "scale/hydrate",
          payload: JSON.parse(savedScale),
        });
      }

      const unsubscribe = store.subscribe(() => {
        localStorage.setItem(
          "datesState",
          JSON.stringify(store.getState().dates)
        );
        localStorage.setItem("scale", JSON.stringify(store.getState().scale));
      });

      return () => unsubscribe();
    } catch (e) {
      console.error("Error with localStorage:", e);
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
