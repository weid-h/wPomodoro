import { RootState } from "..";

export const selectMissions = (state: RootState) => state.todoState.missions;
