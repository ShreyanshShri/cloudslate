import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import useFileStore from "../../../../stores/FileStore";
import OptionsDiv from "./utils/OptionsDiv";

import {
	addOption,
	updateCorrectOption,
	createQuiz,
} from "../../component_functions/entities/quizMaker";

import "./entities.css";

type option = {
	text: string;
	isCorrect: boolean;
};

const QuizMaker = () => {
	const setDisplayQuizMaker = useFileStore(
		(state: any) => state.setDisplayQuizMaker
	);

	const [question, setQuestion] = useState<string>("");
	const [option, setOption] = useState<option>({ text: "", isCorrect: false });
	const [optionsList, setOptionsList] = useState<Array<option>>([]);
	const [correctAnsIndex, setCorrectAnsIndex] = useState<number>(-1);

	const optionInputRef: any = useRef<any>(null);

	return (
		<div id="quiz-maker-blur-wrapper">
			<div id="quiz-maker-container">
				<Header setDisplayQuizMaker={setDisplayQuizMaker} />
				<div id="quiz-maker-body">
					<Question
						question={question}
						setQuestion={setQuestion}
						optionInputRef={optionInputRef}
					/>
					<div id="quiz-maker-options-list">
						<QuizMakerAddOption
							option={option}
							setOption={setOption}
							optionInputRef={optionInputRef}
							setOptionsList={setOptionsList}
						/>

						{optionsList.map((option: any, index: number) => (
							<OptionsDiv
								key={index}
								data={option}
								index={index}
								updateCurrentOption={() =>
									updateCorrectOption(index, setOptionsList, setCorrectAnsIndex)
								}
							/>
						))}
					</div>
					<button
						className="quiz-submit"
						onClick={() => createQuiz(correctAnsIndex, question, optionsList)}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

const Header = ({ setDisplayQuizMaker }: any) => {
	return (
		<div id="quiz-maker-header">
			<h3 id="quiz-maker-title">Generate Quiz</h3>
			<span className="control-btns" onClick={() => setDisplayQuizMaker(false)}>
				<FontAwesomeIcon icon={faXmark} />
			</span>
		</div>
	);
};

const Question = ({ question, setQuestion, optionInputRef }: any) => {
	return (
		<>
			<label htmlFor="question">Question</label>
			<br />
			<input
				id="quiz-maker-question"
				type="text"
				placeholder="Enter your question"
				value={question}
				onChange={(e: any) => setQuestion(e.target.value)}
				autoFocus
				onKeyDown={(e: any) => {
					if (e.keyCode === 13) {
						optionInputRef.current.focus();
					}
				}}
			/>
		</>
	);
};

const QuizMakerAddOption = ({
	option,
	setOption,
	optionInputRef,
	setOptionsList,
}: any) => {
	return (
		<div id="quiz-maker-add-option">
			<label htmlFor="add option">Add Option</label>
			<br />
			<div id="quiz-maker-add-option-wrapper">
				<input
					id="quiz-maker-add-option-input"
					type="text"
					placeholder="Add an option"
					value={option.text}
					ref={optionInputRef}
					onChange={(e: any) =>
						setOption((prev: option) => ({
							text: e.target.value,
							isCorrect: prev.isCorrect,
						}))
					}
					onKeyDown={(e: any) => {
						if (e.keyCode === 13) {
							addOption(option, setOptionsList, setOption);
						}
					}}
				/>
				<button
					className="quiz-submit m-0"
					onClick={() => addOption(option, setOptionsList, setOption)}
				>
					Add
				</button>
			</div>
		</div>
	);
};

export default QuizMaker;
