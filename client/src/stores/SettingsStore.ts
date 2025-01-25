import { create } from "zustand";
import zukeeper from "zukeeper";

import { setDisplaySettings } from "./utils/settingsStoreFunctions";

export type settingsStoreType = {
	displaySettings: boolean;
	setDisplaySettings: (status: boolean) => void;
};

const useSettingsStore = create<settingsStoreType>(
	zukeeper((set: any) => ({
		displaySettings: false,
		setDisplaySettings: (status: boolean) => setDisplaySettings(set, status),
	}))
);

window.store = useSettingsStore;

export default useSettingsStore;
