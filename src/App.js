import React, {useState} from 'react'
import { Icon, Modal, Header, Button, Checkbox } from 'semantic-ui-react'

import { Codexes } from './middleware' 
import { Question } from "./components/question"

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  let [questionSet, setQuestion] = useState(Codexes.getQuestion())
  let [invert, setInvert] = useState(true)
  let [count, setCount] = useState(0)
  let [wins, setWins] = useState(0)
  let [names, setNames] = useState(undefined)

  function next(isWin = true){
    if(isWin) setWins(wins + 1)    
    setCount(count + 1)
    setQuestion(Codexes.getQuestion(names))
    setInvert(Math.random() > 0.5)
  }

  function handleSubmit(e) {
    e.preventDefault()

  }

  function getCodexesCheckboxes() {
    console.log(Codexes)
    let keys = Object.keys(Codexes)
    keys = keys.filter(c => typeof Codexes[c] !== "function")
    let len = keys.length
    return keys.map(c => (<>
      <Checkbox key={new Date()} label={Codexes[c].header}/>
      <br/>
    </>))
  }

  const ModalWithSetting = () => (
    <Modal trigger={<Icon name="settings" size="big"/>} closeIcon>
      <Header icon='archive' content='Archive Old Messages' />
      <Modal.Content>
        {getCodexesCheckboxes()}
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={e=>e}>
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
        {ModalWithSetting()}
      </header>
      <section>
        <h3>Текущий счет: {wins} - {count - wins}</h3>
      </section>
      <Question next={next} invert={invert} {...questionSet}/>

    </div>
  );
}

export default App;
