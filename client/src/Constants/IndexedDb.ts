import { DBSchema } from "idb";
import { RootState } from "../State/reducers";

export const userData = "userData";

export interface pomodoroDb extends DBSchema {
  rootStore: {
    value: RootState;
    key: string;
  };
}
