import { useEffect, useState } from "react";

declare type pomodoroPhase = "WORK" | "SHORT REST" | "LONG REST";

/**
 * Get the remaining time for a phase
 * @param startTime time this phase was started
 * @param totalPhaseTime total phase time in seconds
 */
const remainingTime = (startTime: number, totalPhaseTime: number) => {
  return Math.floor(
    (startTime + totalPhaseTime * 1000 - new Date().getTime()) / 1000
  );
};

/**
 * Pomodoro timer hook
 * @param workingMinutes Length of the work period in minutes
 * @param repsBetweenRests Amount of reps between long rests
 * @param shortRestMinutes Length of short rest in minutes
 * @param longRestMinutes Length of long rest in minutes
 * @param phaseChangeCallback Callback on each phase change e.g work -> rest
 */
export const usePomodoroTimer = (
  workingMinutes: number,
  repsBetweenRests: number,
  shortRestMinutes: number,
  longRestMinutes: number,
  phaseChangeCallback: (newPhase: pomodoroPhase) => void
) => {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<pomodoroPhase>("WORK");
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [currentRep, setCurrentRep] = useState(0);
  const [pomodoros, setPomodoros] = useState(0);
  const [timeLeft, setTimeLeft] = useState(
    remainingTime(startTime, workingMinutes * 60)
  );
  const [pauseTimeLeft, setPauseTimeLeft] = useState(0);

  const toggleIsRunning = () => {
    if (!isRunning) {
      setStartTime(new Date().getTime());
    } else {
      setPauseTimeLeft(timeLeft);
    }
    setIsRunning(!isRunning);
  };

  const restartPhase = () => {
    setIsRunning(false);
    switch (phase) {
      case "WORK":
        setPauseTimeLeft(0);
        setTimeLeft(remainingTime(new Date().getTime(), workingMinutes * 60));
        break;
      case "SHORT REST":
        setPauseTimeLeft(0);
        setTimeLeft(remainingTime(new Date().getTime(), shortRestMinutes * 60));
        break;
      case "LONG REST":
        setPauseTimeLeft(0);
        setTimeLeft(remainingTime(new Date().getTime(), longRestMinutes * 60));
        break;
    }
  };

  const nextPhase = () => {
    setIsRunning(false);
    switch (phase) {
      case "WORK":
        setPauseTimeLeft(0);
        if (currentRep + 1 >= repsBetweenRests) {
          setTimeLeft(
            remainingTime(new Date().getTime(), longRestMinutes * 60)
          );
          phaseChangeCallback("LONG REST");
          setPhase("LONG REST");
        } else {
          phaseChangeCallback("SHORT REST");
          setTimeLeft(
            remainingTime(new Date().getTime(), shortRestMinutes * 60)
          );
          setPhase("SHORT REST");
        }
        break;
      case "SHORT REST":
        setPauseTimeLeft(0);
        setTimeLeft(remainingTime(new Date().getTime(), longRestMinutes * 60));
        phaseChangeCallback("WORK");
        setStartTime(new Date().getTime());
        setPhase("WORK");
        break;
      case "LONG REST":
        setPauseTimeLeft(0);
        setTimeLeft(remainingTime(new Date().getTime(), longRestMinutes * 60));
        phaseChangeCallback("WORK");
        setStartTime(new Date().getTime());
        setPhase("WORK");
        break;
    }
  };

  useEffect(() => {
    let timeout: any;
    let remaining: number;
    if (isRunning) {
      switch (phase) {
        case "WORK":
          remaining = remainingTime(
            startTime,
            pauseTimeLeft > 0 ? pauseTimeLeft : workingMinutes * 60
          );
          if (remaining >= 0) {
            timeout = setTimeout(() => {
              setTimeLeft(remaining);
            }, 1000);
          } else {
            setStartTime(new Date().getTime());
            if (currentRep + 1 >= repsBetweenRests) {
              setPauseTimeLeft(0);
              phaseChangeCallback("LONG REST");
              setPhase("LONG REST");
              setCurrentRep(currentRep + 1);
            } else {
              phaseChangeCallback("SHORT REST");
              setPhase("SHORT REST");
              setCurrentRep(currentRep + 1);
            }
          }
          break;
        case "SHORT REST":
          remaining = remainingTime(
            startTime,
            pauseTimeLeft > 0 ? pauseTimeLeft : shortRestMinutes * 60
          );
          if (remaining >= 0) {
            timeout = setTimeout(() => {
              setTimeLeft(remaining);
            }, 1000);
          } else {
            setPauseTimeLeft(0);
            phaseChangeCallback("WORK");
            setStartTime(new Date().getTime());
            setPhase("WORK");
          }
          break;
        case "LONG REST":
          remaining = remainingTime(
            startTime,
            pauseTimeLeft > 0 ? pauseTimeLeft : longRestMinutes * 60
          );
          if (remaining >= 0) {
            timeout = setTimeout(() => {
              setTimeLeft(remaining);
            }, 1000);
          } else {
            setPauseTimeLeft(0);
            phaseChangeCallback("WORK");
            setStartTime(new Date().getTime());
            setCurrentRep(0);
            setPomodoros(pomodoros + 1);
            setPhase("WORK");
          }
          break;
      }
    }

    return () => {
      clearTimeout(timeout);
    };
  });

  return [
    phase,
    timeLeft,
    pomodoros,
    currentRep,
    isRunning,
    toggleIsRunning,
    restartPhase,
    nextPhase,
  ] as const;
};

export default usePomodoroTimer;
