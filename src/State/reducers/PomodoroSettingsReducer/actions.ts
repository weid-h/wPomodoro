import { ActionTypes } from "./actionTypes";
import { PomodoroSettings } from "./types";

export const setPomodoroSettings = (info: PomodoroSettings) => ({
  type: ActionTypes.SetPomodoroSettings,
  payload: info,
});
