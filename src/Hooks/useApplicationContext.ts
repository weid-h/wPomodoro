import {useEffect, useState} from "react";
import {AppContext} from "../Contexts/ApplicationContext";
import {useIndexedDb} from "./useIndexedDb";
import {getSavedApplicationContext, saveApplicationContext} from "../IndexedDb/Utilities";

export const useApplicationContext = () => {
    const [pomodoroSettings, setPomodoroSettings] = useState({
        workingMinutes: 20,
        longRestMinutes: 15,
        shortRestMinutes: 5,
        workRepsBetweenRests: 3
    });
    const [hydrated, setHydrated] = useState(false)

    const {haveIndexedDb, loading, db} = useIndexedDb();

    const pomodoroSettingsSetter = async (settings: PomodoroSettings) => {
        if (haveIndexedDb && db) {
            await saveApplicationContext(settings, db);
        }
        setPomodoroSettings(settings);
    }

    useEffect(() => {
        let isCancelled = false;
        console.log("fired")

        if (!isCancelled && db && haveIndexedDb && !hydrated && !loading) {
            getSavedApplicationContext(db).then((settings) => {
                if (settings)
                    setPomodoroSettings(settings)
                setHydrated(true);
            }).catch(() => {
                setHydrated(true);
            })
        }

        return () => {
            isCancelled = true;
        }
    }, [db, haveIndexedDb, hydrated, loading])

    const initialState: ApplicationContext = {
        pomodoroSettings,
        setPomodoroSettings: pomodoroSettingsSetter
    };


    return [AppContext, initialState, loading] as const;
};
