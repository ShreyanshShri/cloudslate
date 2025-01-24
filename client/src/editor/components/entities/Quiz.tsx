import { useState } from "react";
import Controls from "./utils/Controls";
import OptionsDiv from "./utils/OptionsDiv";

type option = {
	text: string;
	isCorrect: boolean;
};
type props = {
	data: {
		question: string;
		optionsList: Array<option>;
		correctAnsIndex: number;
	};
	index: number;
};

const Quiz = ({ data, index }: props) => {
	const [optionsList, setOptionsList] = useState<Array<option>>(
		data.optionsList.map((opt: any) => ({ text: opt.text, isCorrect: false }))
	);
	const [currentAnsIndex, setCurrentAnsIndex] = useState<number>(-1);
	const [turnGreen, setTurnGreen] = useState(-1);
	const [turnRed, setTurnRed] = useState(-1);

	const updateCurrentOption = (index: number) => {
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

	const submitAnswer = () => {
		if (currentAnsIndex === -1) return alert("Please select an option!");
		if (currentAnsIndex === data.correctAnsIndex) {
			setTurnGreen(currentAnsIndex);
			setTurnRed(-1);
		} else {
			setTurnGreen(data.correctAnsIndex);
			setTurnRed(currentAnsIndex);
		}
	};

	return (
		<div className="entity-wrapper mb-2">
			<div className="entity-top-bar">
				<div className="entitiy-title">Quiz</div>
				<Controls index={index} />
				<div className="entity-tools" style={{ width: "60px" }}>
					{/* <span className="control-btns" onClick={saveState}><FontAwesomeIcon icon={ faLock } /></span>
                <span className="control-btns" onClick={takeScreenShot}><FontAwesomeIcon icon={ faCameraRetro } /></span> */}
				</div>
			</div>
			<div className="quiz-body">
				<p className="quiz-question">{data.question}</p>
				<div className="options-list">
					{optionsList.map((opt: any, index: number) => (
						<OptionsDiv
							key={index}
							index={index}
							data={opt}
							updateCurrentOption={updateCurrentOption}
							isGreen={turnGreen === index}
							isRed={turnRed === index}
						/>
					))}
				</div>
				<button onClick={submitAnswer} className="quiz-submit">
					Submit
				</button>
			</div>
		</div>
	);
};

export default Quiz;
