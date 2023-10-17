import React, { useEffect, useState } from "react";
import { quizData } from "./quizData";
import '../App.css';

const QuizDashBoard = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [question, setQuestion] = useState(null);
  const [id, setId] = useState(0);
  const [options, setOptions] = useState([]);
  const [myAnswer, setMyAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [score, setScore] = useState(0)
  const [ended, setEnded] = useState(false);
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    loadQuizData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentQuestion])

  const loadQuizData = () => {
    setDisabled(true)
    setQuestion(quizData[currentQuestion].question)
    setOptions(quizData[currentQuestion].options);
    setCorrectAnswer(quizData[currentQuestion].answer)
    setId(quizData[currentQuestion].id)
  }

  const checkAnswer = (opt) => {
    setMyAnswer(opt);
    setDisabled(false)
  }

  const handleNext = () => {
    if (correctAnswer === myAnswer) {
      setScore(score + 1)
    }
    setCurrentQuestion(currentQuestion + 1);
  }

  const handleFinish = () => {
    if (currentQuestion === quizData.length - 1) setEnded(true)
    if (correctAnswer === myAnswer) setScore(score + 1)
  }

  return <div className="container">
    {ended ? <div className="result">
      <span className="over">Game Over !</span>
      <h1>Your Final score - <span className={`score ${score === quizData.length  ? 'scored' : ''}`}>{score}</span> points.</h1>
      <div className="">
      {quizData.map(que =>(
            <span className="option">{que.question} - <b>{que.answer}</b></span>
      ))}
      </div>
    </div>:
    <div>
      <h1>You have scored - <span className={`score ${score === quizData.length  ? 'scored' : ''}`}>{score}</span> points.</h1>
      <span className="question">Q {id}. {question}</span>
      <div className="options">
      {options.map(opt => (
        <span className={`option ${myAnswer === opt  ? 'selected' : ''}`} key={opt} onClick={() => checkAnswer(opt)}>{opt}</span>
      )
      )}
      </div>
      {(currentQuestion < quizData.length - 1) && <button className={`button ${disabled ? 'disabled' : ''}`} disabled={disabled} onClick={handleNext}>Next</button>}
      {(currentQuestion === quizData.length - 1) && <button className="button" onClick={handleFinish}>Finish</button>}
    </div>
 } </div>
}

export default QuizDashBoard;

