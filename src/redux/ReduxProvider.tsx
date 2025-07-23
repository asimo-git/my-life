import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

export default function ReduxProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    try {
      const savedState = localStorage.getItem("datesState");
      if (savedState) {
        store.dispatch({
          type: "dates/hydrate",
          payload: JSON.parse(savedState),
        });
      }

      const unsubscribe = store.subscribe(() => {
        localStorage.setItem(
          "datesState",
          JSON.stringify(store.getState().dates)
        );
      });

      return () => unsubscribe();
    } catch (e) {
      console.error("Error with localStorage:", e);
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
