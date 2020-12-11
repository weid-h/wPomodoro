import { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import {
  getRootState,
  saveRootState,
} from "../IndexedDb/Repository/StateRepository";
import { setPomodoroSettings } from "../State/reducers/PomodoroSettingsReducer/actions";
import { executeToDoAction } from "../State/reducers/ToDoReducer/actions";
import { ActionTypes } from "../State/reducers/ToDoReducer/actionTypes";
import { useIndexedDb } from "./useIndexedDb";

export const useHydration = () => {
  const dispatch = useDispatch();
  const [hydrationAttempted, setHydrationAttempted] = useState(false);
  const store = useStore();

  const { haveIndexedDb, loading, db, isError, error } = useIndexedDb();

  console.log(isError, error, haveIndexedDb);

  //   const pomodoroSettingsSetter = async (settings: PomodoroSettings) => {
  //     if (haveIndexedDb && db) {
  //       await saveRootState(settings, db);
  //     }
  //     dispatch(setPomodoroSettings(settings));
  //   };

  window.onbeforeunload = () => {
    if (haveIndexedDb && db) {
      const state = store.getState();
      saveRootState(state, db).then(() => {});
    }
    return;
  };

  useEffect(() => {
    let isCancelled = false;

    if (
      !isCancelled &&
      db &&
      haveIndexedDb &&
      !hydrationAttempted &&
      !loading
    ) {
      getRootState(db)
        .then((settings) => {
          if (settings) {
            dispatch(setPomodoroSettings(settings.pomodoroSettings));
            dispatch(
              executeToDoAction({
                type: ActionTypes.HydrateToDoState,
                data: settings?.todoState,
              })
            );
          }
          setHydrationAttempted(true);
        })
        .catch(() => {
          setHydrationAttempted(true);
        });
    }

    return () => {
      isCancelled = true;
    };
  }, [db, dispatch, haveIndexedDb, hydrationAttempted, loading]);

  return { loading, hydrationAttempted } as const;
};
