import useFileStore from "../../../../stores/FileStore";
import { quiz_type } from "../../../../types/fileTypes";

type option = {
	text: string;
	isCorrect: boolean;
};

const addOption = (
	option: option,
	setOptionsList: Function,
	setOption: Function
) => {
	if (option.text == "") return;
	setOptionsList((prev: Array<option>) => [...prev, option]);
	setOption({ text: "", isCorrect: false });
};

const updateCorrectOption = (
	index: number,
	setOptionsList: Function,
	setCorrectAnsIndex: Function
) => {
	setOptionsList((prev: Array<option>) => {
		let temp = prev.map((opt: option, i: number) => {
			if (i === index) {
				return { text: opt.text, isCorrect: true };
			}
			return { text: opt.text, isCorrect: false };
		});
		return [...temp];
	});
	setCorrectAnsIndex(index);
};

const createQuiz = (
	correctAnsIndex: number,
	question: string,
	optionsList: option[]
) => {
	const pushQuiz = useFileStore.getState().pushQuiz;
	const setDisplayQuizMaker = useFileStore.getState().setDisplayQuizMaker;

	if (correctAnsIndex === -1) return alert("Please pick a correct answer");
	if (question === "") return alert("Please enter the question");
	const data = {
		question,
		optionsList,
		correctAnsIndex,
	};
	pushQuiz(data as quiz_type);
	setDisplayQuizMaker(false);
};

export { addOption, updateCorrectOption, createQuiz };
