import {useEffect, useState} from "react";
import {IDBPDatabase, openDB} from "idb";
import {pomodoroDb} from "../Constants/IndexedDb";


export const useIndexedDb = () => {
    const [haveIndexedDb, setHaveIndexedDb] = useState(false);
    const [loading, setLoading] = useState(false);
    const [db, setDb] = useState<IDBPDatabase<pomodoroDb> | undefined>(undefined);
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const getIndexedDb = async () => {
            try {
                const db = await openDB("wPomodoro", 1, {
                    upgrade(database: IDBPDatabase<pomodoroDb>) {
                        database.createObjectStore("pomodoroSettings");
                    }
                });
                setDb(db);
            } catch (e) {
                setError(e.message);
                setIsError(true);
            }
        }

        if (!cancelled && !loading && !haveIndexedDb) {
            setLoading(true);
            getIndexedDb().then(() => {
                setLoading(false);
                setHaveIndexedDb(true);
            }).catch((e) => {
                setIsError(true);
                setError(e.message);
                setLoading(false);

            });
        }

        return () => {
            cancelled = true;
        }
    }, [haveIndexedDb, loading])

    return {
        haveIndexedDb,
        loading,
        db,
        isError,
        error
    }
}