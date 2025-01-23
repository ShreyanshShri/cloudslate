import { create } from 'zustand';
import zukeeper from "zukeeper";

declare global {
    interface Window {
        store:any;
    }
}

type entityStore = {
    alert: {
        status: boolean,
        type: "error" | "warning" | "success" | null,
        message: string
    },
    setAlert: (message: string, type: string) => void,
    clearAlert: () => void,
};

const setAlert = (set: any, message: string, type: string) => {
    set(() => {
        return {
            alert: {
                status: true,
                type,
                message
            }
        };
    });
}

const clearAlert = (set: any) => {
    set(() => {
        return {
            alert: {
                status: false,
                type: null,
                message: ""
            }
        }
    })
}

const useAlertStore = create<entityStore>(zukeeper((set: any) => ({
    alert: {status: false, message: ""},
    setAlert: (message: string, type: string) => setAlert(set, message, type),
    clearAlert: () => clearAlert(set),
})));

window.store = useAlertStore;

export default useAlertStore;