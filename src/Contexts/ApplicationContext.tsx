import React, { useState } from "react";

export const AppContext = React.createContext<ApplicationContext>({
  workingMinutes: 0,
  setWorkingMinutes: () => {},
  restingMinutes: 0,
  setRestingMinutes: () => {},
});

export const useApplicationContext = () => {
  const [workingMinutes, setWorkingMinutes] = useState(0.1);
  const [restingMinutes, setRestingMinutes] = useState(0.1);

  const initialState:ApplicationContext = {
    workingMinutes,
    setWorkingMinutes,
    restingMinutes,
    setRestingMinutes
  };

  return [AppContext, initialState] as const;
};
