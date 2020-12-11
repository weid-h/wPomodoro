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
      const missions = state.missions.map((mission, index) =>
        index === missionToUpdateIndex
          ? {
              ...mission,
              toDos: [
                ...mission.toDos,
                {
                  id: uuid(),
                  missionId: action.missionId,
                  description: action.newToDoDescription,
                  createdAt: new Date(),
                  modifiedAt: new Date(),
                  complete: false,
                  inProgress: false,
                  order: mission.toDos.length + 1,
                },
              ],
            }
          : mission
      );
      return { ...state, missions: [...missions] };
    }
    case ActionTypes.RemoveToDo: {
      const parentMissionIndex = findMissionIndex(
        state.missions,
        action.parentMissionId
      );
      const updatedMissions = state.missions.map((mission, index) => {
        if (index === parentMissionIndex) {
          const toDoToRemoveIndex = mission.toDos.findIndex(
            (todo) => todo.id === action.toDoToRemoveID
          );
          return {
            ...mission,
            toDos: [
              ...mission.toDos.slice(0, toDoToRemoveIndex),
              ...mission.toDos
                .slice(toDoToRemoveIndex + 1)
                .map((toDo) => ({ ...toDo, order: toDo.order - 1 })),
            ],
          };
        }
        return { ...mission, order: mission.order - 1 };
      });

      return { ...state, missions: updatedMissions };
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
      const missionToUpdateIndex = state.missions.findIndex(
        (mission) => mission.id === action.parentMissionId
      );
      const missions = state.missions.map((mission, index) => {
        const toDoToUpdateIndex = mission.toDos.findIndex(
          (todo) => todo.id === action.toDoToToggleID
        );
        if (index === missionToUpdateIndex) {
          return {
            ...mission,
            toDos: [
              ...mission.toDos.map((toDo, index) => {
                if (index === toDoToUpdateIndex) {
                  return { ...toDo, complete: !toDo.complete };
                } else {
                  return toDo;
                }
              }),
            ],
          };
        } else {
          return mission;
        }
      });
      return { ...state, missions: [...missions] };
    }
    case ActionTypes.HydrateToDoState: {
      return { ...action.data };
    }
    default:
      return state;
  }
};

export default ToDoReducer;
