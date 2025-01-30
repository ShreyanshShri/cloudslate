import { create } from "zustand";
import zukeeper from "zukeeper";
import axios from "axios";

import useAlertStore from "./AlertStore";
import useFileStore from "./FileStore";

import { entity_type } from "../types/fileTypes";
import { action_types, history_el } from "../types/historyTypes";

import {
	addEntity,
	updateEntity,
	deleteEntity,
	clearEntity,
} from "./utils/editHistoryStateFunctions";
import {
	addEntityToServer,
	updateEntityInServer,
	deleteEntityInServer,
} from "./utils/editHistoryServerFunctions";

type editHistoryStore = {
	history: history_el[];
	addEntity: (entity: entity_type) => void;
	updateEntity: (entity: entity_type, index: number) => void;
	deleteEntity: (index: number) => void;
	clearEntity: () => void;
	pushToServer: (file_id: string) => Promise<void>;
	hardSave: (file_id: string) => void;
};

// updating server main function
const pushToServer = async (file_id: string) => {
	const clearEntity = useEditHistoryStore.getState().clearEntity;
	const history = useEditHistoryStore.getState().history;

	let copy = history;

	for (const h of copy) {
		if (h.action_type == action_types.AddEntity) {
			await addEntityToServer(h, file_id);
		}
	}

	for (const h of copy) {
		if (h.action_type == action_types.UpdateEntity) {
			await updateEntityInServer(h, file_id);
		}
	}

	for (const h of copy) {
		if (h.action_type == action_types.DeleteEntity) {
			await deleteEntityInServer(h, file_id);
		}
	}

	clearEntity();
};

const hardSave = async (file_id: string) => {
	const setAlert = useAlertStore.getState().setAlert;
	const entities = useFileStore.getState().file.entities;
	const clearEntity = useEditHistoryStore.getState().clearEntity;
	try {
		const response = await axios.put(
			`${import.meta.env.VITE_HTTP_URL}/editor/edit/all?id=${file_id}`,
			{
				entities,
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		clearEntity();
		setAlert(response.data.message, "success");
	} catch (err: any) {
		setAlert(err.response.data.message, "error");
		console.error(err.response.data);
	}
};

const useEditHistoryStore = create<editHistoryStore>(
	zukeeper((set: any) => ({
		history: [],
		addEntity: (entity: entity_type) => addEntity(set, entity),
		updateEntity: (entity: entity_type, index: number) =>
			updateEntity(set, entity, index),
		deleteEntity: (index: number) => deleteEntity(set, index),
		clearEntity: () => clearEntity(set),
		pushToServer: (file_id: string) => pushToServer(file_id),
		hardSave: (file_id: string) => hardSave(file_id),
	}))
);

window.store = useEditHistoryStore;

export default useEditHistoryStore;
