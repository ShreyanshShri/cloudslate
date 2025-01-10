import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import useEntityStore from '../../stores/EntityStore';
import OptionsDiv from './utils/OptionsDiv';

import "./entities.css";

type option = {
  text: string,
  isCorrect: boolean
};

const QuizMaker = () => {
  const setDisplayQuizMaker = useEntityStore((state: any) => state.setDisplayQuizMaker);
  const pushQuiz = useEntityStore((state: any) => state.pushQuiz);

  const [question, setQuestion] = useState<string>("");
  const [option, setOption] = useState<option>({text: "", isCorrect: false});
  const [optionsList, setOptionsList] = useState<Array<option>>([]);
  const [correctAnsIndex, setCorrectAnsIndex] = useState<number>(-1);

  const addOption = () => {
    if(option.text == "") return;
    setOptionsList((prev: Array<option>) => [...prev, option]);
    setOption({text: "", isCorrect: false});
  }

  const updateCorrectOption = (index: number) => {
    setOptionsList((prev: Array<option>) => {
      let temp = prev.map((opt: option, i: number) => {
        if (i === index) { return ({text: opt.text, isCorrect: true}); }
        return ({text: opt.text, isCorrect: false});
      })
      return [...temp];
    });
    setCorrectAnsIndex(index);
  }

  const createQuiz = () => {
    if(correctAnsIndex === -1) return alert("Please pick a correct answer");
    if(question === "") return alert("Please enter the question");
    const data = {
      question,
      optionsList,
      correctAnsIndex
    };
    pushQuiz(data);
    setDisplayQuizMaker(false);
  }

  return (
    <div id="quiz-maker-blur-wrapper">
      <div id="quiz-maker-container">
        <div id="quiz-maker-header">
          <h3 id="quiz-maker-title">Generate Quiz</h3>
          <span className='control-btns' onClick={() => setDisplayQuizMaker(false)}><FontAwesomeIcon icon={ faXmark } /></span>
        </div>
        <div id="quiz-maker-body">
          <label htmlFor="question">Question</label><br />
          <input id="quiz-maker-question" type='text' placeholder='Enter your question' value={question} onChange={(e: any) => setQuestion(e.target.value)} />
          <div id="quiz-maker-options-list">
              <div id="quiz-maker-add-option">
                <label htmlFor="add option">Add Option</label><br />
                <div id="quiz-maker-add-option-wrapper">
                  <input id="quiz-maker-add-option-input" 
                          type='text'  
                          placeholder='Add an option' 
                          value={option.text}   
                          onChange={(e: any) => setOption((prev: option) => ({text: e.target.value, isCorrect: prev.isCorrect}))} 
                          onKeyDown={(e: any) => { if(e.keyCode === 13) { addOption() } }}
                          />
                  <button className='quiz-submit m-0' onClick={addOption}>Add</button>
                </div>
                {/* <input type='checkbox' onChange={(e: any) => setOption((prev: option) => ({text: prev.text, isCorrect: e.target.checked}))} /> */}
              </div>
              {optionsList.map((option: any, index: number) => (
                // <OptionBox key={index} option={option} index={index} updateCorrectOption={updateCorrectOption} />
                <OptionsDiv key={index} data={option} index={index} updateCurrentOption={updateCorrectOption} isRed={null} isGreen={null} />
              ))}
          </div>
          <button className='quiz-submit' onClick={createQuiz}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default QuizMaker