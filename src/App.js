import React, {useState} from 'react'
import { Icon, Modal, Header, Button, Checkbox } from 'semantic-ui-react'
import { connect } from "react-redux"

import { Codexes } from './middleware' 
import { Question } from "./components/question"
import {default as AC} from "./actionCreators"

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App(props) {
  // Iknow about destructurisation
  let {invert, refreshInvert} = props
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

  function getCodexesCheckboxes() {
    let keys = Object.keys(Codexes)
    keys = keys.filter(c => typeof Codexes[c] !== "function")
  
    return keys.map(c => (<>
      <Checkbox 
        key={new Date()} 
        label={Codexes[c].header}
        onClick={e => {
          let n = names
          if(names.has(c)){
            n.delete(c)
            setNames(n)
          } else {
            n.add(c)
            setNames(n)
          }
        }}/>
      <br/>
    </>))
  }

  const ModalWithSetting = (modalOpen) => (
    <Modal open={modalOpen}>
      <Header icon='archive' content='Настройте выдачу вопросов' />
      <Modal.Content>
        {getCodexesCheckboxes()}
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={e => {
          setModalOpen(false)
          setNames(previousNames)
        }}>
          <Icon name='remove' /> Отмена
        </Button>
        <Button color='green' onClick={handleSubmit}>
          <Icon name='checkmark' /> Сохранить
        </Button>
      </Modal.Actions>
    </Modal>
  )


  return (
    <div className="App">
      <header className="App-header">
        <h2>Появился УК РФ</h2> 
        <Icon name="settings" size="big" onClick={e => {
          setModalOpen(true)
          previousNames = names
        }}/> 
        {ModalWithSetting()}
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
  addCount: isWin => dispatch(AC.addCount())
})

export default connect(MSTP, MDTP)(App);
