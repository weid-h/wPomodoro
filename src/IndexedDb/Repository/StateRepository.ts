import { IDBPDatabase } from "idb";
import { pomodoroDb, userData } from "../../Constants/IndexedDb";
import { RootState } from "../../State/reducers";

export const saveRootState = async (
  settings: RootState,
  db: IDBPDatabase<pomodoroDb>
) => {
  try {
    const transaction = db.transaction("rootStore", "readwrite");
    const store = transaction.objectStore("rootStore");
    await store.put(settings, userData);
    await transaction.done;
  } catch (e) {
    console.log(e);
  }
};

export const getRootState = async (db: IDBPDatabase<pomodoroDb>) => {
  try {
    const transaction = db.transaction("rootStore", "readonly");
    const store = transaction.objectStore("rootStore");
    const data = store.get(userData);
    await transaction.done;
    return data as Promise<RootState>;
  } catch (e) {
    console.log(e);
  }
};
