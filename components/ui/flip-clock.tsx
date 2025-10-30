"use client";

import { useEffect, useState } from "react";

function getTimeParts(time: number) {
  const seconds = Math.floor(time / 1000);
  const minutes = Math.floor(seconds / 60) > 0 ? Math.floor(seconds / 60) : 0;
  const hours = Math.floor(minutes / 60) > 0 ? Math.floor(minutes / 60) : 0;
  const days = Math.floor(hours / 24) > 0 ? Math.floor(hours / 24) : 0;
  const weeks = Math.floor(days / 7) > 0 ? Math.floor(days / 7) : 0;
  const months = Math.floor(weeks / 4) > 0 ? Math.floor(weeks / 4) : 0;
  const years = Math.floor(months / 12) > 0 ? Math.floor(months / 12) : 0;

  return { years, months, weeks, days, hours, minutes, seconds };
}

export default function FlipClockCountdown({
  targetTime,
}: {
  targetTime: number;
}) {
  const [newTime, setNewTime] = useState(targetTime);

  const [newTimeParts, setNewTimeParts] = useState<Record<string, number>>({});

  useEffect(() => {
    setNewTime(targetTime);
  }, [targetTime]);

  useEffect(() => {
    setNewTimeParts(getTimeParts(newTime));
  }, [newTime]);

  return (
    <div>
      {Object.entries(newTimeParts).map(
        ([key, value]) =>
          value > 0 && (
            <div key={key}>
              <div className="flip-clock-value">{value}</div>
              <div className="flip-clock-label">{key}</div>
            </div>
          )
      )}
    </div>
  );
}
