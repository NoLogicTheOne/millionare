import React from 'react'
import { connect } from 'react-redux'
import { Icon, Modal, Header, Button, Checkbox } from 'semantic-ui-react'

import { default as AC } from "../actionCreators"

function ModalSetting(props) {
    let { fullNames, names, modalOpen } = props
    let { modalToggle, addName, deleteName } = props
    let { save, cancel, savingNames } = props
    let { Codexes, setQuestion } = props 
    
    const getCodexesCheckboxes = () => {
        return fullNames.map((currentName, idx) => (<>
          <Checkbox 
            key={idx} 
            label={Codexes[currentName].header}
            defaultChecked={(() => {
              return savingNames.has(currentName)
            })()}
            onChange={e => {
              if(savingNames.has(currentName)){
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
        {getCodexesCheckboxes()}
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={e => {
          modalToggle()
          cancel()
          
        }}>
          <Icon name='cancel' /> Отменить изменения
        </Button>
        <Button color='green' onClick={e => {
          modalToggle()
          save()
          setQuestion()
        }}>
          <Icon name='checkmark' /> Сохранить
        </Button>
      </Modal.Actions>
    </Modal>)
}

const MSTP = state => ({
  ...state.settings,
  Codexes: state.question.Codexes
})

const MDTP = dispatch => ({
    modalToggle: () => dispatch(AC.modalToggle()),
    addName: name => dispatch(AC.addName(name)),
    deleteName: name => dispatch(AC.deleteName(name)),
    save: () => dispatch(AC.saveChangeNames()),
    cancel: () => dispatch(AC.cancelChangeNames())
})

const MP = (state, dispatch) => ({
  setQuestion: () => dispatch(AC.setQuestion(state.settings.names))
})

export default connect(MSTP, MDTP)(ModalSetting)