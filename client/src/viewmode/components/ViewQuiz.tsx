import { useState, useEffect } from "react";

import { quiz_type } from "../../types/fileTypes";
import { option_type } from "../../types/fileTypes";

import "../viewmode-styles.css";

type props = {
	data: string;
	index: number;
};

const ViewQuiz = ({ data }: props) => {
	const parsedData: quiz_type = JSON.parse(data);
	const [correctLetter, setCorrectLetter] = useState<string>("A");

	useEffect(() => {
		parsedData.optionsList.forEach((option: option_type, index: number) => {
			if (option.isCorrect) setCorrectLetter(String.fromCharCode(index + 65));
		});
	}, [parsedData]);

	return (
		<div className="view-quiz">
			<div className="question">
				<b>Q.</b> {parsedData.question}
			</div>
			{parsedData.optionsList.map((option: option_type, index: number) => {
				return (
					<div className="option-list-item" key={index}>
						{String.fromCharCode(index + 65)}. {option.text}
					</div>
				);
			})}
			<span className="corr-ans">Correct option is {correctLetter}.</span>
		</div>
	);
};

export default ViewQuiz;
