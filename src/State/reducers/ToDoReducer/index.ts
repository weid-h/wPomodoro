import { ActionTypes, ToDoActionType } from "./actionTypes";
import { Mission, ToDo, ToDoState } from "./types";
import { v4 as uuid } from "uuid";

const initialToDoState: ToDoState = {
  missions: [],
};

const findToDoIndex = (todos: ToDo[], ToDoID: string) =>
  todos.findIndex((todo) => todo.id === ToDoID);

const findMissionIndex = (missions: Mission[], missionID: string) =>
  missions.findIndex((mission) => mission.id === missionID);

const ToDoReducer = (
  state: ToDoState = initialToDoState,
  action: ToDoActionType
): ToDoState => {
  switch (action.type) {
    case ActionTypes.AddMission: {
      const newMission: Mission = {
        id: uuid(),
        description: action.newMissionDescription,
        createdAt: new Date(),
        modifiedAt: new Date(),
        order: state.missions.length + 1,
        complete: false,
        inProgress: false,
        toDos: [],
      };
      return { ...state, missions: [...state.missions, newMission] };
    }
    case ActionTypes.RemoveMission: {
      const missionToRemoveIndex = state.missions.findIndex(
        (mission) => mission.id === action.missionToRemoveID
      );
      state.missions.splice(missionToRemoveIndex, 1);
      return { ...state };
    }
    case ActionTypes.UpdateMissionDescription: {
      const IndexToUpdate = state.missions.findIndex(
        (mission) => mission.id === action.missionToUpdateID
      );
      if (IndexToUpdate >= 0) {
        state.missions[IndexToUpdate].description = action.newDescription;
      }
      return { ...state };
    }
    case ActionTypes.ToggleMissionProgress: {
      const IndexToUpdate = state.missions.findIndex(
        (mission) => mission.id === action.missionToUpdateID
      );
      return {
        ...state,
        missions: state.missions.map((mission, index) =>
          index === IndexToUpdate
            ? { ...mission, inProgress: !mission.inProgress }
            : mission
        ),
      };
    }
    case ActionTypes.ToggleMissionComplete: {
      const IndexToUpdate = state.missions.findIndex(
        (mission) => mission.id === action.missionToUpdateID
      );
      return {
        ...state,
        missions: state.missions.map((mission, index) =>
          index === IndexToUpdate
            ? { ...mission, complete: !mission.complete, inProgress: false }
            : mission
        ),
      };
    }
    case ActionTypes.AddToDo: {
      const missionToUpdateIndex = state.missions.findIndex(
        (mission) => mission.id === action.missionId
      );

      if (missionToUpdateIndex > 0) {
        const newToDo: ToDo = {
          id: uuid(),
          missionId: action.missionId,
          description: action.newToDoDescription,
          createdAt: new Date(),
          modifiedAt: new Date(),
          complete: false,
          inProgress: false,
          order: state.missions[missionToUpdateIndex].toDos.length + 1,
        };
        state.missions[missionToUpdateIndex].toDos.push(newToDo);
      }
      return { ...state };
    }
    case ActionTypes.RemoveToDo: {
      const parentMissionIndex = findMissionIndex(
        state.missions,
        action.parentMissionId
      );
      if (parentMissionIndex > 0) {
        const toDoToRemoveIndex = findToDoIndex(
          state.missions[parentMissionIndex].toDos,
          action.toDoToRemoveID
        );
        if (toDoToRemoveIndex > 0) {
          state.missions[parentMissionIndex].toDos.splice(toDoToRemoveIndex, 1);
        }
      }
      return { ...state };
    }
    case ActionTypes.UpdateToDoDescription: {
      const parentMissionIndex = findMissionIndex(
        state.missions,
        action.parentMissionId
      );
      if (parentMissionIndex >= 0) {
        const toDoToUpdateIndex = findToDoIndex(
          state.missions[parentMissionIndex].toDos,
          action.toDoToUpdateID
        );
        if (toDoToUpdateIndex > 0) {
          state.missions[parentMissionIndex].toDos[
            toDoToUpdateIndex
          ].description = action.newDescription;
        }
      }
      return { ...state };
    }
    case ActionTypes.ToggleToDoProgress: {
      const parentMissionIndex = findMissionIndex(
        state.missions,
        action.parentMissionId
      );
      if (parentMissionIndex >= 0) {
        const toDoToUpdateIndex = findToDoIndex(
          state.missions[parentMissionIndex].toDos,
          action.toDoToToggleID
        );
        if (toDoToUpdateIndex > 0) {
          state.missions[parentMissionIndex].toDos[
            toDoToUpdateIndex
          ].inProgress = !state.missions[parentMissionIndex].toDos[
            toDoToUpdateIndex
          ].inProgress;
        }
      }
      return { ...state };
    }
    case ActionTypes.ToggleToDoComplete: {
      const parentMissionIndex = findMissionIndex(
        state.missions,
        action.parentMissionId
      );
      if (parentMissionIndex >= 0) {
        const toDoToUpdateIndex = findToDoIndex(
          state.missions[parentMissionIndex].toDos,
          action.toDoToToggleID
        );
        if (toDoToUpdateIndex > 0) {
          state.missions[parentMissionIndex].toDos[
            toDoToUpdateIndex
          ].complete = !state.missions[parentMissionIndex].toDos[
            toDoToUpdateIndex
          ].complete;
        }
      }
      return { ...state };
    }
    case ActionTypes.HydrateToDoState: {
      return { ...action.data };
    }
    default:
      return state;
  }
};

export default ToDoReducer;
