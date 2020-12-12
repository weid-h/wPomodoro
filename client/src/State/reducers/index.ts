import { combineReducers } from "redux";
import PomodoroSettingsReducer from "./PomodoroSettingsReducer";
import { PomodoroSettings } from "./PomodoroSettingsReducer/types";
import ToDoReducer from "./ToDoReducer";
import { ToDoState } from "./ToDoReducer/types";

export interface RootState {
  pomodoroSettings: PomodoroSettings;
  todoState: ToDoState;
}

export const rootReducer = combineReducers<RootState>({
  pomodoroSettings: PomodoroSettingsReducer,
  todoState: ToDoReducer,
});
