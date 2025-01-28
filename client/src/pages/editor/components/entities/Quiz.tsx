import { useState } from "react";
import Controls from "./utils/Controls";
import OptionsDiv from "./utils/OptionsDiv";

import {
	updateCurrentOption,
	submitAnswer,
} from "../../component_functions/entities/quiz";

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

	return (
		<div className="entity-wrapper mb-2">
			<div className="entity-top-bar">
				<div className="entity-title">Quiz</div>
				<Controls index={index} />
				<div className="entity-tools" style={{ width: "60px" }}></div>
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
							setCurrentAnsIndex={setCurrentAnsIndex}
							setOptionsList={setOptionsList}
							isGreen={turnGreen === index}
							isRed={turnRed === index}
						/>
					))}
				</div>
				<button
					onClick={() =>
						submitAnswer(currentAnsIndex, setTurnGreen, setTurnRed, data)
					}
					className="quiz-submit"
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default Quiz;
