import { IDBPDatabase } from "idb";
import { pomodoroDb, userPomodoroSettingsKey } from "../Constants/IndexedDb";

export const saveApplicationContext = async (
  settings: PomodoroSettings,
  db: IDBPDatabase<pomodoroDb>
) => {
  try {
    const transaction = db.transaction("pomodoroSettings", "readwrite");
    const store = transaction.objectStore("pomodoroSettings");
    await store.put(settings, userPomodoroSettingsKey);
    await transaction.done;
  } catch (e) {
    console.log(e);
  }
};

export const getSavedApplicationContext = async (
  db: IDBPDatabase<pomodoroDb>
) => {
  try {
    const transaction = db.transaction("pomodoroSettings", "readwrite");
    const store = transaction.objectStore("pomodoroSettings");
    const data = store.get(userPomodoroSettingsKey);
    await transaction.done;
    return data as Promise<PomodoroSettings>;
  } catch (e) {
    console.log(e);
  }
};
