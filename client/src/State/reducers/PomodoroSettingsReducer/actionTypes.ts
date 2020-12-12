import { Action } from "redux";
import { PomodoroSettings } from "./types";

export enum ActionTypes {
  SetPomodoroSettings = "SET_USER_INFO",
  AddContact = "ADD_CONTACT",
}

interface SetPomodoroSettings extends Action {
  type: ActionTypes.SetPomodoroSettings;
  payload: PomodoroSettings;
}

export type ApplicationActionType = SetPomodoroSettings;
