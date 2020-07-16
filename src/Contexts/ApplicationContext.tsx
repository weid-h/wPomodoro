import React, { useState } from "react";

export const AppContext = React.createContext<ApplicationContext>({
  pomodoroSettings: {
    workingMinutes:0,
    longRestMinutes:0,
    shortRestMinutes:0,
    workRepsBetweenRests:0
  },
  setPomodoroSettings: () => {}
});

export const useApplicationContext = () => {
  const [pomodoroSettings, setPomodoroSettings] = useState({
    workingMinutes:15,
    longRestMinutes:15,
    shortRestMinutes:5,
    workRepsBetweenRests:3
  });

  const initialState:ApplicationContext = {
    pomodoroSettings,
    setPomodoroSettings
  };

  return [AppContext, initialState] as const;
};
