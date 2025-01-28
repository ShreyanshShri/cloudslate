type option = {
	text: string;
	isCorrect: boolean;
};

const updateCurrentOption = (
	index: number,
	setOptionsList: Function,
	setCurrentAnsIndex: Function
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
	setCurrentAnsIndex(index);
};

const submitAnswer = (
	currentAnsIndex: number,
	setTurnGreen: Function,
	setTurnRed: Function,
	data: any
) => {
	if (currentAnsIndex === -1) return alert("Please select an option!");
	if (currentAnsIndex === data.correctAnsIndex) {
		setTurnGreen(currentAnsIndex);
		setTurnRed(-1);
	} else {
		setTurnGreen(data.correctAnsIndex);
		setTurnRed(currentAnsIndex);
	}
};

export { updateCurrentOption, submitAnswer };
