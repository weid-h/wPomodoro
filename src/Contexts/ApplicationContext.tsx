import React from "react";

export const AppContext = React.createContext<ApplicationContext>({
  pomodoroSettings: {
    workingMinutes:0,
    longRestMinutes:0,
    shortRestMinutes:0,
    workRepsBetweenRests:0
  },
  setPomodoroSettings: () => {}
});