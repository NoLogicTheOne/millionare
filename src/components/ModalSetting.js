import React from 'react'
import { connect } from 'react-redux'
import { Icon, Modal, Header, Button, Checkbox, Radio } from 'semantic-ui-react'
import { Link } from "react-router-dom"  

import { default as AC } from "../actionCreators"

function ModalSetting(props) {
    let { changeApp, app } = props
    let { fullNames, modalOpen } = props
    let { modalToggle, addName, deleteName } = props
    let { save, cancel, names } = props
    let { Codexes, setQuestion } = props 
    
    const applicationToggler = () => {
      return (<>
        <Radio
          label="Cascading"
          name="chooseApp"
          checked={app == "cascading"}
          onClick={e => changeApp("cascading")}
          style={{display: "block"}}>
        </Radio>
        <Radio
          label="Markup vs Margin"
          name="chooseApp"
          checked={app == "marga"}
          onClick={e => changeApp("marga")}
          style={{display: "block"}}>
        </Radio>
        <Radio
          label="CodexesGame"
          name="chooseApp"
          checked={ app == "codexes" }
          onClick={e => changeApp("codexes")}>
        </Radio>
      </>)
    }

    const getCodexesCheckboxes = () => {
        return fullNames.map((currentName, idx) => (<>
          <Checkbox 
            key={idx} 
            label={Codexes[currentName].header}
            defaultChecked={names.has(currentName)}
            onChange={e => {
              if(names.has(currentName)){
                deleteName(currentName)
              } else {
                addName(currentName)
              }
            }}/>
          <br/>
        </>))
      }

    return (<Modal open={modalOpen}>
      <Header icon='archive' content='Настройте выдачу вопросов' />
      <Modal.Content>
        {applicationToggler()}
      </Modal.Content>
      <Modal.Content>
        {getCodexesCheckboxes()}
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={e => {
          modalToggle()
          cancel()
        }}>
          <Icon name='cancel' /> Отменить изменения
        </Button>
        <Link to={"/" + app}>
          <Button color='green' onClick={e => {
            modalToggle()
            save()
            setQuestion()
          }}>
          <Icon name='checkmark' /> Сохранить
          </Button>
        </Link>
      </Modal.Actions>
    </Modal>)
}

const MSTP = state => ({
  ...state.settings,
  Codexes: state.question.Codexes
})

const MDTP = dispatch => ({
    dispatch: dispatch,
    changeApp: app => dispatch(AC.changeApp(app)),
    modalToggle: () => dispatch(AC.modalToggle()),
    addName: name => dispatch(AC.addName(name)),
    deleteName: name => dispatch(AC.deleteName(name)),
    save: () => dispatch(AC.saveChangeNames()),
    cancel: () => dispatch(AC.cancelChangeNames())
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

export default connect(MSTP, MDTP, MP)(ModalSetting)