import useEditHistoryStore from "../EditsHistoryStore";

import { file_type, quiz_type } from "../../types/fileTypes";

const setFile = (set: any, file: file_type) => {
	set((state: any) => ({
		...state,
		file,
	}));
};

const setFileVisibility = (set: any, isPublic: boolean) => {
	set((state: any) => ({
		...state,
		file: {
			...state.file,
			public: isPublic,
		},
	}));
};

const deleteEntity = (set: any, index: number) => {
	let cont = true;
	set((state: any) => {
		let temp = state.file.entities;
		if (temp.length === 0) {
			cont = false;
			return temp;
		}
		if (index > temp.length - 1) {
			cont = false;
			return temp;
		}
		temp.splice(index, 1);
		return {
			file: {
				...state.file,
				entities: [...temp],
			},
		};
	});
	if (!cont) return;

	const deleteEntity_editHistory = useEditHistoryStore.getState().deleteEntity;
	deleteEntity_editHistory(index);
};

const moveEntity = (set: any, index: number, dirn: string) => {
	set((state: any) => {
		let temp = state.file.entities;
		if (dirn === "up") {
			if (temp[index - 1] == undefined) {
				return temp;
			}
			const t = temp[index];
			temp[index] = temp[index - 1];
			temp[index - 1] = t;
		}
		if (dirn === "down") {
			if (temp[index + 1] == undefined) {
				return temp;
			}
			const t = temp[index];
			temp[index] = temp[index + 1];
			temp[index + 1] = t;
		}
		return {
			file: {
				...state.file,
				entities: [...temp],
			},
		};
	});
};

// textarea logic
const pushTextEditor = (set: any, text: string) => {
	const entity = { type: "textarea", data: text };
	set((state: any) => ({
		file: {
			...state.file,
			entities: [...state.file.entities, entity],
		},
	}));
	const addEntity = useEditHistoryStore.getState().addEntity;
	addEntity(entity);
};

/*
    {
        type: "textarea",
        text: string
    }
*/
const setTextareaText = (set: any, index: number, text: string) => {
	set((state: any) => {
		let updatedList = state.file.entities;
		updatedList[index].data = text;
		return {
			file: {
				...state.file,
				entities: [...updatedList],
			},
		};
	});
	const updateEntity = useEditHistoryStore.getState().updateEntity;
	updateEntity({ type: "textarea", data: text }, index);
};

// plotter logic
const pushPlotter = (set: any) => {
	const entity = { type: "plotter", data: "" };
	set((state: any) => ({
		file: {
			...state.file,
			entities: [...state.file.entities, entity],
		},
	}));
	const addEntity = useEditHistoryStore.getState().addEntity;
	addEntity(entity);
};

/* 
    {
        type: "plotter",
        data: "JSON.stringify(state)"
    }
*/
const setPlotterData = (set: any, index: number, data: string) => {
	set((state: any) => {
		let updatedList = state.file.entities;
		updatedList[index].data = data;
		return {
			file: {
				...state.file,
				entities: [...updatedList],
			},
		};
	});
	const updateEntity = useEditHistoryStore.getState().updateEntity;
	updateEntity({ type: "plotter", data }, index);
};

// QUIZ logic
const setDisplayQuizMaker = (set: any, display_state: boolean) => {
	set(() => ({ displayQuizMaker: display_state }));
};

/*
    question: string,
    optionsList: [{
                    text: string,
                    isCorrect: boolean
                }],
    correctAnsIndex: number
*/
const pushQuiz = (set: any, data: quiz_type) => {
	const entity = { type: "quiz", data: JSON.stringify(data) };
	set((state: any) => {
		return {
			file: {
				...state.file,
				entities: [...state.file.entities, entity],
			},
		};
	});
	const addEntity = useEditHistoryStore.getState().addEntity;
	addEntity(entity);
};

// whiteboard logic
const pushWhiteboard = (set: any, snapshot: any) => {
	const entity = { type: "whiteboard", data: snapshot };
	set((state: any) => {
		return {
			file: {
				...state.file,
				entities: [...state.file.entities, entity],
			},
		};
	});
	const addEntity = useEditHistoryStore.getState().addEntity;
	addEntity(entity);
};

const saveWhiteboard = (set: any, index: number, snapshot: any) => {
	set((state: any) => {
		let temp = state.file.entities;
		temp[index] = { type: "whiteboard", data: JSON.stringify(snapshot) };
		return {
			file: {
				...state.file,
				entities: [...temp],
			},
		};
	});
	const updateEntity = useEditHistoryStore.getState().updateEntity;
	updateEntity({ type: "whiteboard", data: JSON.stringify(snapshot) }, index);
};

export {
	setFile,
	setFileVisibility,
	deleteEntity,
	moveEntity,
	pushTextEditor,
	setTextareaText,
	pushPlotter,
	setPlotterData,
	setDisplayQuizMaker,
	pushQuiz,
	pushWhiteboard,
	saveWhiteboard,
};
