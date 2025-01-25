import { create } from "zustand";
import zukeeper from "zukeeper";
import moment from "moment";

import { file_type, quiz_type, user_type } from "../types/fileTypes";

import {
	setFile,
	setFileVisibility,
	setContributorsList,
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
} from "./utils/fileStoreFunctions";

export type fileStoreType = {
	file: file_type;
	setFile: (file: file_type) => void;
	setFileVisibility: (isPublic: boolean) => void;
	setContributorsList: (contributors: user_type[]) => void;
	displayQuizMaker: boolean;
	deleteEntity: (index: number) => void;
	moveEntity: (index: number, dirn: string) => void;
	setDisplayQuizMaker: (curr_state: boolean) => void;
	pushTextEditor: (text: string) => void;
	pushPlotter: () => void;
	pushQuiz: (data: quiz_type) => void;
	pushWhiteboard: (snapshot: any) => void;
	setTextareaText: (index: number, text: string) => void;
	setPlotterData: (index: number, data: string) => void;
	saveWhiteboard: (index: number, snapshot: any) => void;
};

const useFileStore = create<fileStoreType>(
	zukeeper((set: any) => ({
		file: {
			admin: "User",
			contributors: [],
			createdAt: moment().format("YYYY-MM-DD"),
			public: false,
			title: "New File",
			entities: [],
		},
		setFile: (file: file_type) => setFile(set, file),
		setFileVisibility: (isPublic: boolean) => setFileVisibility(set, isPublic),
		setContributorsList: (contributors: user_type[]) =>
			setContributorsList(set, contributors),
		displayQuizMaker: false,
		deleteEntity: (index: number) => deleteEntity(set, index),
		moveEntity: (index: number, dirn: string) => moveEntity(set, index, dirn),
		setDisplayQuizMaker: (curr_state: boolean) =>
			setDisplayQuizMaker(set, curr_state),
		pushTextEditor: (text: string) => pushTextEditor(set, text),
		pushPlotter: () => pushPlotter(set),
		pushQuiz: (data: quiz_type) => pushQuiz(set, data),
		pushWhiteboard: (snapshot: any) => pushWhiteboard(set, snapshot),
		setTextareaText: (index: number, text: string) =>
			setTextareaText(set, index, text),
		setPlotterData: (index: number, data: string) =>
			setPlotterData(set, index, data),
		saveWhiteboard: (index: number, snapshot: any) =>
			saveWhiteboard(set, index, snapshot),
	}))
);

window.store = useFileStore;

export default useFileStore;
