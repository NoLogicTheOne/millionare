import React from 'react'
import { Icon } from 'semantic-ui-react'
import { connect } from "react-redux"

import Question from "../components/question"
import { default as AC} from "../actionCreators"
import { default as ModalSetting } from '../components/ModalSetting'


function CodexesGame(props) {
  // I know about destructurisation
  let { invert } = props
  let { count_wins, count_loose } = props
  let { modalToggle } = props

  return (
    <div className="App">
      <header className="App-header">
        <h2>Появился УК РФ</h2>
        <Icon name="settings" size="big" onClick={modalToggle}/> 
        <ModalSetting />
      </header>
      <section>
        <h3>Текущий счет: {count_wins} - {count_loose}</h3>
      </section>
      <Question invert={invert}/>

    </div>
  );
}

const MSTP = state => ({
  ...state.main,
  names: state.settings.names
}) 

const MDTP = dispatch => ({
  dispatch,
  modalToggle: () => dispatch(AC.modalToggle()),
})

const MP = (state, dispatchProps) => {
  let { names } = state
  let { dispatch } = dispatchProps
  
  return ({
      ...state,
      ...dispatchProps,
      setQuestion: () => dispatch(AC.setQuestion(names))
  })
}

export default connect(MSTP, MDTP, MP)(CodexesGame);
