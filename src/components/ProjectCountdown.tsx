"use client";

import { useEffect, useState } from "react";

function timeLeft(deadline: Date) {
  const diff = Math.max(0, deadline.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    expired: diff === 0,
  };
}

const PLACEHOLDER = { days: 0, hours: 0, minutes: 0, expired: false };

export function ProjectCountdown({ deadline }: { deadline: string }) {
  const [left, setLeft] = useState(PLACEHOLDER);

  useEffect(() => {
    const target = new Date(`${deadline}T23:59:59`);
    setLeft(timeLeft(target));
    const id = setInterval(() => setLeft(timeLeft(target)), 30000);
    return () => clearInterval(id);
  }, [deadline]);

  return (
    <div className="countdown" aria-live="off">
      <div className="countdown__cell">
        <div className="disp countdown__value countdown__value--accent">{left.days}</div>
        <div className="countdown__label">giorni</div>
      </div>
      <div className="countdown__cell">
        <div className="disp countdown__value">{left.hours}</div>
        <div className="countdown__label">ore</div>
      </div>
      <div className="countdown__cell">
        <div className="disp countdown__value">{left.minutes}</div>
        <div className="countdown__label">minuti</div>
      </div>
    </div>
  );
}
