import { create } from "zustand";
import zukeeper from "zukeeper";

declare global {
	interface Window {
		store: any;
	}
}

export type alertStoreType = {
	alert: {
		status: boolean;
		type: "error" | "warning" | "success" | null;
		message: string;
	};
	confirm: {
		status: boolean;
		message: string;
		response: boolean;
		hasResponded: boolean;
	};
	setAlert: (message: string, type: string) => void;
	setConfirm: (message: string) => void;
	setResponse: (response: boolean) => void;
	clearAlert: () => void;
	clearConfirm: () => void;
};

const setAlert = (set: any, message: string, type: string) => {
	set(() => {
		return {
			alert: {
				status: true,
				type,
				message,
			},
		};
	});
};

const clearAlert = (set: any) => {
	set(() => {
		return {
			alert: {
				status: false,
				type: null,
				message: "",
			},
		};
	});
};

// Note always call clear confirm once you are done with the req data
// to open the dialog box;
const setConfirm = (set: any, message: string) => {
	set((state: any) => ({
		...state,
		confirm: {
			status: true,
			message,
			response: false,
			hasResponded: false,
		},
	}));
};
// to get the response (only for Confirm.tsx, you dont need to use it)
const setResponse = (set: any, response: boolean) => {
	set((state: alertStoreType) => ({
		...state,
		confirm: {
			status: false,
			message: "",
			response,
			hasResponded: true,
		},
	}));
};
// to reset the data
const clearConfirm = (set: any) => {
	set((state: alertStoreType) => ({
		...state,
		confirm: {
			status: false,
			message: "",
			response: false,
			hasResponded: false,
		},
	}));
};

const useAlertStore = create<alertStoreType>(
	zukeeper((set: any) => ({
		alert: { status: false, message: "" },
		confirm: {
			status: false,
			message: "",
			response: false,
			hasResponded: false,
		},
		setAlert: (message: string, type: string) => setAlert(set, message, type),
		setConfirm: (message: string) => setConfirm(set, message),
		setResponse: (response: boolean) => setResponse(set, response),
		clearAlert: () => clearAlert(set),
		clearConfirm: () => clearConfirm(set),
	}))
);

window.store = useAlertStore;

export default useAlertStore;
