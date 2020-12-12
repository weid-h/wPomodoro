import { useCallback, useEffect, useState } from "react";

export type pomodoroPhase = "LONG REST" | "SHORT REST" | "WORK";

export const useTimer = (
  workingMinutes: number,
  repsBetweenRests: number,
  shortRestMinutes: number,
  longRestMinutes: number,
  phaseChangeCallback: (newPhase: pomodoroPhase) => void
) => {
  const workingMillis = workingMinutes * 60000;
  const shortRestMillis = shortRestMinutes * 60000;
  const longRestMillis = longRestMinutes * 60000;

  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<pomodoroPhase>("WORK");
  const [startTime, setStartTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(Math.floor(workingMillis / 1000));
  const [millisLeft, setMillisLeft] = useState(workingMillis);
  const [pomodoros, setPomodoros] = useState(0);
  const [currentRep, setCurrentRep] = useState(0);
  const [pausedatTime, setPausedAtTime] = useState(0);

  const updateTime = (millis: number) => {
    setMillisLeft(millis);
    setTimeLeft(millis > 0 ? Math.ceil(millis / 1000) : 0);
  };

  const toggleIsRunning = () => {
    if (!isRunning) {
      setStartTime(Date.now());
      setIsRunning(true);
      console.log("set isrunning to true");
    } else {
      setIsRunning(false);
      setPausedAtTime(millisLeft);
      console.log("set isrunning to false");
    }
  };

  const nextPhase = useCallback(
    (keepRunning: boolean = true) => {
      let newPhase: pomodoroPhase = "WORK";
      setIsRunning(keepRunning);
      switch (phase) {
        case "LONG REST":
          setPomodoros(pomodoros + 1);
          setCurrentRep(0);
          setPausedAtTime(0);
          setStartTime(Date.now());
          setPhase("WORK");
          updateTime(workingMillis);
          break;
        case "SHORT REST":
          setPausedAtTime(0);
          setStartTime(Date.now());
          setPhase("WORK");
          updateTime(workingMillis);
          break;
        case "WORK":
          setCurrentRep(currentRep + 1);
          setPausedAtTime(0);
          setStartTime(Date.now());
          if (currentRep + 1 > 2) {
            updateTime(longRestMillis);
            newPhase = "LONG REST";
            setPhase(newPhase);
          } else {
            updateTime(shortRestMillis);
            newPhase = "SHORT REST";
            setPhase(newPhase);
          }
          break;
      }
      phaseChangeCallback(newPhase);
    },
    [
      currentRep,
      setPausedAtTime,
      setStartTime,
      setPhase,
      shortRestMillis,
      longRestMillis,
      workingMillis,
      phase,
      setIsRunning,
      phaseChangeCallback,
      pomodoros,
    ]
  );

  const restartPhase = useCallback(() => {
    setIsRunning(false);
    setStartTime(Date.now());
    setPausedAtTime(0);
    switch (phase) {
      case "LONG REST":
        updateTime(longRestMillis);
        break;
      case "SHORT REST":
        updateTime(shortRestMillis);
        break;
      case "WORK":
        updateTime(workingMillis);
        break;
    }
  }, [phase, longRestMillis, shortRestMillis, workingMillis]);

  const getFinishingTime = useCallback(
    (phaseMillis: number) =>
      startTime + (pausedatTime > 0 ? pausedatTime : phaseMillis),
    [startTime, pausedatTime]
  );

  const handlePhase = useCallback(
    (phaseMillis: number) => {
      const finishingTime = getFinishingTime(phaseMillis);
      const timetoFinish = finishingTime - Date.now();
      if (timetoFinish > 0) {
        updateTime(timetoFinish > 0 ? timetoFinish : 0);
      } else {
        updateTime(0);
        nextPhase();
      }
    },
    [nextPhase, getFinishingTime]
  );

  const tick = useCallback(() => {
    switch (phase) {
      case "LONG REST": {
        handlePhase(longRestMillis);
        break;
      }
      case "SHORT REST": {
        handlePhase(shortRestMillis);
        break;
      }
      case "WORK": {
        handlePhase(workingMillis);
        break;
      }
    }
  }, [phase, workingMillis, handlePhase, longRestMillis, shortRestMillis]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [millisLeft, isRunning, tick]);

  return {
    phase,
    timeLeft,
    pomodoros,
    currentRep,
    isRunning,
    toggleIsRunning,
    nextPhase,
    restartPhase,
  } as const;
};

export default useTimer;
