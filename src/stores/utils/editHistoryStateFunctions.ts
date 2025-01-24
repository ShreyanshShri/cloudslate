import useEditHistoryStore from "../EditsHistoryStore";
import useFileStore from "../FileStore";

import type { history_el } from "../../types/historyTypes";
import { action_types } from "../../types/historyTypes";
import { entity_type } from "../../types/fileTypes";

const addEntity = (set: any, entity: entity_type) => {
	const index = useFileStore.getState().file.entities.length;

	set((state: any) => ({
		...state,
		history: [
			...state.history,
			{ action_type: action_types.AddEntity, entity, index: index - 1 },
		],
	}));
	console.log(
		"(addEntity) File Entities: ",
		useFileStore.getState().file.entities
	);
	console.log("(addEntity) History: ", useEditHistoryStore.getState().history);
};

const updateEntity = (set: any, entity: entity_type, index: number) => {
	const history = useEditHistoryStore.getState().history;
	let found = false;
	const updatedHistory = history.map((el: history_el): history_el => {
		if (el.index === index && el.action_type == action_types.UpdateEntity) {
			found = true;
			return { action_type: action_types.UpdateEntity, entity, index };
		}
		return el;
	});
	if (found) {
		set((state: any) => ({
			...state,
			history: [...updatedHistory],
		}));
	} else {
		set((state: any) => ({
			...state,
			history: [
				...updatedHistory,
				{ action_type: action_types.UpdateEntity, entity, index },
			],
		}));
	}
	console.log(
		"(updateEntity) File Entities: ",
		useFileStore.getState().file.entities
	);
	console.log(
		"(updateEntity) History: ",
		useEditHistoryStore.getState().history
	);
};

const deleteEntity = (set: any, index: number) => {
	const history = useEditHistoryStore.getState().history;
	let found = false;
	let hasJustCreated = false;
	const updatedHistory = history.flatMap((el: history_el): any => {
		if (el.index === index) {
			if (el.action_type == action_types.AddEntity) {
				hasJustCreated = true;
			}

			found = true;
			return [];
		}
		return el;
	});
	if (found && hasJustCreated) {
		set((state: any) => ({
			...state,
			history: [...updatedHistory],
		}));
	} else {
		set((state: any) => ({
			...state,
			history: [
				...updatedHistory,
				{ action_type: action_types.DeleteEntity, index },
			],
		}));
	}

	console.log(
		"(deleteEntity) File Entities: ",
		useFileStore.getState().file.entities
	);
	console.log(
		"(deleteEntity) History: ",
		useEditHistoryStore.getState().history
	);
};

const clearEntity = (set: any) => {
	set((state: any) => ({
		...state,
		history: [],
	}));

	console.log(
		"(clearEntity) File Entities: ",
		useFileStore.getState().file.entities
	);
	console.log(
		"(clearEntity) History: ",
		useEditHistoryStore.getState().history
	);
};

export { addEntity, updateEntity, deleteEntity, clearEntity };
