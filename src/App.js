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
  let [names, setNames] = useState(new Set())
  let [modalOpen, setModalOpen] = useState(true)
  let previousNames = new Set()

  function next(isWin = true){
    let throwingNames = names.size ? names : []
    if(isWin) setWins(wins + 1)    
    setCount(count + 1)
    setQuestion(Codexes.getQuestion([...throwingNames]))
    setInvert(Math.random() > 0.5)
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

  const ModalWithSetting = () => (
    <Modal key={new Date()} open={modalOpen}>
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
        <h3>Текущий счет: {wins} - {count - wins}</h3>
      </section>
      <Question next={next} invert={invert} {...questionSet}/>

    </div>
  );
}

export default App;
