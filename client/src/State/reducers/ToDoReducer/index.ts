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
      const missionToRemoveIndex = findMissionIndex(
        state.missions,
        action.missionToRemoveID
      );
      return {
        ...state,
        missions: [
          ...state.missions.slice(0, missionToRemoveIndex),
          ...state.missions.slice(missionToRemoveIndex + 1).map((mission) => ({
            ...mission,
            order: mission.order - 1,
          })),
        ],
      };
    }
    case ActionTypes.UpdateMissionDescription: {
      const IndexToUpdate = state.missions.findIndex(
        (mission) => mission.id === action.missionToUpdateID
      );
      const newMissions = state.missions.map((mission, index) => {
        if (index === IndexToUpdate) {
          return {
            ...mission,
            description: action.newDescription,
          };
        }
        return mission;
      });
      return { ...state, missions: newMissions };
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
      const newMissions = state.missions.map((mission, index) => {
        if (index === parentMissionIndex) {
          const toDoToUpdateIndex = mission.toDos.findIndex(
            (todo) => todo.id === action.toDoToUpdateID
          );
          return {
            ...mission,
            toDos: mission.toDos.map((todo, index) => {
              if (index === toDoToUpdateIndex) {
                return {
                  ...todo,
                  description: action.newDescription,
                };
              }
              return todo;
            }),
          };
        }
        return mission;
      });
      return { ...state, missions: newMissions };
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
    case ActionTypes.OrderMission: {
      const indexOfMission = state.missions.findIndex(
        (mission) => mission.id === action.missionId
      );

      const originalOrder = state.missions[indexOfMission].order;

      let swapWith = originalOrder + action.steps;

      if (swapWith > state.missions.length + 1) {
        swapWith = state.missions.length + 1;
      } else if (swapWith <= 1) {
        swapWith = 1;
      }

      let swappedOriginal = false;
      let swappedTarget = false;

      return {
        ...state,
        missions: state.missions.map((mission) => {
          if (mission.order === originalOrder && !swappedOriginal) {
            swappedOriginal = true;
            return { ...mission, order: swapWith };
          } else if (mission.order === swapWith && !swappedTarget) {
            swappedTarget = true;
            return { ...mission, order: originalOrder };
          } else {
            return mission;
          }
        }),
      };
    }
    case ActionTypes.OrderToDo: {
      const indexOfMission = state.missions.findIndex(
        (mission) => mission.id === action.parentMissionId
      );

      const updatedMissions = state.missions.map((mission, index) => {
        if (indexOfMission !== index) {
          return mission;
        }

        const indexOfTodo = mission.toDos.findIndex(
          (todo) => todo.id === action.todoId
        );

        const originalOrder = mission.toDos[indexOfTodo].order;

        let swapWith = originalOrder + action.steps;

        if (swapWith > mission.toDos.length + 1) {
          swapWith = mission.toDos.length + 1;
        } else if (swapWith <= 1) {
          swapWith = 1;
        }

        let swappedOriginal = false;
        let swappedTarget = false;

        return {
          ...mission,
          toDos: mission.toDos.map((todo) => {
            if (todo.order === originalOrder && !swappedOriginal) {
              swappedOriginal = true;
              return { ...todo, order: swapWith };
            } else if (todo.order === swapWith && !swappedTarget) {
              swappedTarget = true;
              return { ...todo, order: originalOrder };
            } else {
              return todo;
            }
          }),
        };
      });

      return {
        ...state,
        missions: updatedMissions,
      };
    }
    case ActionTypes.HydrateToDoState: {
      return { ...action.data };
    }
    default:
      return state;
  }
};

export default ToDoReducer;
