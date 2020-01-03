import React, {useState} from 'react'
import { Icon } from 'semantic-ui-react'
import { connect } from "react-redux"

import { Codexes } from './middleware' 
import { Question } from "./components/question"
import {default as AC} from "./actionCreators"
import { default as ModalSetting } from './components/ModalSetting'

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App(props) {
  // I know about destructurisation
  let { invert, refreshInvert } = props
  let { count_wins, count_loose, addCount } = props

  let [questionSet, setQuestion] = useState(Codexes.getQuestion())
  let [count, setCount] = useState(0)
  let [names, setNames] = useState(new Set())
  let [modalOpen, setModalOpen] = useState(true)
  let previousNames = new Set()

  function next(isWin = true){
    let throwingNames = names.size ? names : []
    addCount(isWin)
    setCount(count + 1)
    setQuestion(Codexes.getQuestion([...throwingNames]))
    refreshInvert()
  }

  function handleSubmit(e) {
    setModalOpen(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Появился УК РФ</h2> 
        <ModalSetting />
      </header>
      <section>
        <h3>Текущий счет: {count_wins} - {count_loose}</h3>
      </section>
      <Question next={next} invert={invert} {...questionSet}/>

    </div>
  );
}

const MSTP = state => state["main"]

const MDTP = dispatch => ({
  refreshInvert: () => dispatch(AC.refreshInvert()),
  addCount: isWin => dispatch(AC.addCount(isWin))
})

export default connect(MSTP, MDTP)(App);
