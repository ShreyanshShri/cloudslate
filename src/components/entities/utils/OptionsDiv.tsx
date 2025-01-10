import "../entities.css";

type props = {
    index: number,
    data: {
        text: string,
        isCorrect: boolean
    },
    updateCurrentOption: (index: number) => void | null,
    isRed: boolean | null,
    isGreen: boolean | null,
}

const OptionsDiv = ({ data, updateCurrentOption, index, isRed, isGreen } : props) => {
  return (
    <div className={isRed ? "options-div opt-red" : isGreen ? "options-div opt-green" : "options-div"} onClick={() => updateCurrentOption(index)}>
        <span>{data.text}</span>
        <input type="checkbox" name="select-option" checked={data.isCorrect} />
    </div>
  )
}

export default OptionsDiv