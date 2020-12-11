import { Action } from "redux";
import { ToDo, Mission, ToDoState } from "./types";

export enum ActionTypes {
  AddToDo = "ADD_TODO",
  RemoveToDo = "REMOVE_TODO",
  UpdateToDoDescription = "UPDATE_TODO_DESCRIPTION",
  ToggleToDoProgress = "TOGGLE_TODO_PROGRESS",
  ToggleToDoComplete = "TOGGLE_TODO_COMPLETE",
  AddMission = "ADD_MISSION",
  RemoveMission = "REMOVE_MISSION",
  UpdateMissionDescription = "UPDATE_MISSION_DESCRIPTION",
  ToggleMissionProgress = "TOGGLE_MISSION_PROGRESS",
  ToggleMissionComplete = "TOGGLE_MISSION_COMPLETE",
  HydrateToDoState = "HYDRATE_TODO_STATE",
}

interface AddToDo extends Action {
  type: ActionTypes.AddToDo;
  newToDoDescription: string;
  missionId: string;
}

interface RemoveToDo extends Action {
  type: ActionTypes.RemoveToDo;
  toDoToRemoveID: string;
  parentMissionId: string;
}

interface UpdateToDoDescription extends Action {
  type: ActionTypes.UpdateToDoDescription;
  parentMissionId: string;
  toDoToUpdateID: string;
  newDescription: string;
}

interface ToggleToDoProgress extends Action {
  type: ActionTypes.ToggleToDoProgress;
  toDoToToggleID: string;
  parentMissionId: string;
}

interface ToggleToDoComplete extends Action {
  type: ActionTypes.ToggleToDoComplete;
  toDoToToggleID: string;
  parentMissionId: string;
}

interface AddMission extends Action {
  type: ActionTypes.AddMission;
  newMissionDescription: string;
}

interface RemoveMission extends Action {
  type: ActionTypes.RemoveMission;
  missionToRemoveID: string;
}

interface UpdateMissionDescription extends Action {
  type: ActionTypes.UpdateMissionDescription;
  missionToUpdateID: string;
  newDescription: string;
}

interface ToggleMissionProgress extends Action {
  type: ActionTypes.ToggleMissionProgress;
  missionToUpdateID: string;
}

interface ToggleMissionComplete extends Action {
  type: ActionTypes.ToggleMissionComplete;
  missionToUpdateID: string;
}

interface HydrateToDoState extends Action {
  type: ActionTypes.HydrateToDoState;
  data: ToDoState;
}

export type ToDoActionType =
  | AddToDo
  | RemoveToDo
  | UpdateToDoDescription
  | ToggleToDoProgress
  | ToggleToDoComplete
  | AddMission
  | RemoveMission
  | UpdateMissionDescription
  | ToggleMissionProgress
  | ToggleMissionComplete
  | HydrateToDoState;
