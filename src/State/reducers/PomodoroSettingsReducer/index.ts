import { ActionTypes, ApplicationActionType } from "./actionTypes";
import { PomodoroSettings } from "./types";

const initialPomodoroSettings: PomodoroSettings = {
  workingMinutes: 25,
  longRestMinutes: 15,
  shortRestMinutes: 5,
  workRepsBetweenRests: 4,
};

const PomodoroSettingsReducer = (
  state: PomodoroSettings = initialPomodoroSettings,
  action: ApplicationActionType
): PomodoroSettings => {
  switch (action.type) {
    case ActionTypes.SetPomodoroSettings:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default PomodoroSettingsReducer;
