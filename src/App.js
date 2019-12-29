import React, {useState} from 'react';

import { Codexes } from './middleware' 
import { Question } from "./components/question"

import './App.css';

function App() {
  let [questionSet, setQuestion] = useState(Codexes.getQuestion())
  let [invert, setInvert] = useState(true)
  let [count, setCount] = useState(0)
  let [wins, setWins] = useState(0)

  function next(isWin = true){
    if(isWin) setWins(wins + 1)    
    setCount(count + 1)
    setQuestion(Codexes.getQuestion())
    setInvert(Math.random() > 0.5)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Попробуй ответить на вопросы!!</h2>  
      </header>
      <section>
        <h3>Текущий счет: {wins} - {count - wins}</h3>
      </section>
      <Question next={next} invert={invert} {...questionSet}/>

    </div>
  );
}

export default App;
