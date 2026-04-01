"use client";

import { useEffect, useState } from "react";

/** Updates once per second for live countdown / deadline checks. */
export function usePledgeClock() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}
