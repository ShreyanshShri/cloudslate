import { settingsStoreType } from "../SettingsStore";

const setDisplaySettings = (set: any, status: boolean) => {
	console.log("changing", status);
	set((state: settingsStoreType) => ({
		...state,
		displaySettings: status,
	}));
};

export { setDisplaySettings };
