import { useState } from "react";
import "./WelcomeBlock.css";
import { Button, DatePicker } from "antd";

export default function WelcomeBlock() {
  const [dateOfBirth, setDateOfBirth] = useState<string | null>(null);

  return (
    <>
      <div className="welcome-block">
        <h1>My Life</h1>
        <div className="card">
          <DatePicker
            size="large"
            placeholder="Enter your date of birth"
            className="date-picker"
            onChange={(_, dateString) => {
              setDateOfBirth(dateString as string);
            }}
          />
          <Button type="primary" size="large">
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
