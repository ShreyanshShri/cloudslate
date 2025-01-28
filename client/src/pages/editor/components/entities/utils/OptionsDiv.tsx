import "../entities.css";

type props = {
	index: number;
	data: {
		text: string;
		isCorrect: boolean;
	};
	updateCurrentOption: Function;
	setOptionsList?: Function;
	setCurrentAnsIndex?: Function;
	isRed?: boolean | null;
	isGreen?: boolean | null;
};

const OptionsDiv = ({
	data,
	updateCurrentOption,
	setOptionsList,
	setCurrentAnsIndex,
	index,
	isRed,
	isGreen,
}: props) => {
	return (
		<div
			className={
				isRed
					? "options-div opt-red"
					: isGreen
					? "options-div opt-green"
					: "options-div"
			}
			onClick={() =>
				updateCurrentOption(index, setOptionsList, setCurrentAnsIndex)
			}
		>
			<span>{data.text}</span>
			<input
				type="checkbox"
				name="select-option"
				checked={data.isCorrect}
				readOnly
			/>
		</div>
	);
};

export default OptionsDiv;
