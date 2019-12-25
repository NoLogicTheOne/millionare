import React, {useState} from 'react';

import { Codexes } from './middleware' 
import { Question } from "./components/question"

import './App.css';

function App() {
  let [questionSet, setQuestion] = useState(Codexes.getQuestion())
  
  function next(){
    setQuestion(Codexes.getQuestion())
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Попробуй ответить на вопросы!!</h2>  
      </header>
      <Question next={next} {...questionSet}/>

    </div>
  );
}

export default App;
