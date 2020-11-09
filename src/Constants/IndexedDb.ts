import {DBSchema} from "idb";

export const userPomodoroSettingsKey = "userPomodoroSettings"

export interface pomodoroDb extends DBSchema {
    pomodoroSettings: {
        value: {
            longRestMinutes: number,
            shortRestMinutes: number,
            workRepsBetweenRests: number,
            workingMinutes: number,
        },
        key: string;
    }
}