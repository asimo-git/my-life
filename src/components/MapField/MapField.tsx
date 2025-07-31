import { useState } from "react";
import "./MapField.css";
import { updateDateOfBirth } from "../../redux/datesSlice";
import { useDispatch } from "react-redux";

export default function MapField() {
  //   const [dateOfBirth, setDateOfBirth] = useState<string | null>(null);
  //   const dispatch = useDispatch();

  return (
    <>
      <div className="welcome-block">
        <h1>My Map</h1>
      </div>
    </>
  );
}
