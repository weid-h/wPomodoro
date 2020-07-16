declare type ApplicationContext = {
  pomodoroSettings: {
    workingMinutes: number;
    shortRestMinutes: number;
    longRestMinutes: number;
    workRepsBetweenRests: number;
  };
  setPomodoroSettings: Function;
};
