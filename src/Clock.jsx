import { useEffect, useState } from "react";
import { addLeadingZero } from "../utils/string";

export default function Clock() {
  const setCurrentTime = () => {
    const time = new Date();

    return {
      hour: time.getHours(),
      minute: time.getMinutes(),
      second: addLeadingZero(time.getSeconds()),
    };
  };

  const [time, setTime] = useState(setCurrentTime);

  useEffect(() => {
    setTimeout(() => setTime(setCurrentTime()));
  }, [time]);

  return (
    <h2>
      {time.hour}:{time.minute}:{time.second}
    </h2>
  );
}
