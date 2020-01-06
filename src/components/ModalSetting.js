import React from 'react'
import { connect } from 'react-redux'
import { Icon, Modal, Header, Button, Checkbox } from 'semantic-ui-react'

import { default as AC } from "../actionCreators"
// Codexes must be in states perhaps
// Or in state we need store only names, Codexes got by requests
import { Codexes } from '../middleware'

function ModalSetting(props) {
    let { fullNames, names, modalOpen } = props
    let { modalToggle, addName, deleteName } = props
    let { save, cancel, savingNames } = props
    
    const getCodexesCheckboxes = () => {
      
        return fullNames.map((currentName, idx) => (<>
          <Checkbox 
            key={idx} 
            label={Codexes[currentName].header}
            defaultChecked={(() => {
              console.log(names.has(currentName))
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
        }}>
          <Icon name='checkmark' /> Сохранить
        </Button>
      </Modal.Actions>
    </Modal>)
}

const MSTP = state => state.settings 

const MDTP = dispatch => ({
    modalToggle: () => dispatch(AC.modalToggle()),
    addName: name => dispatch(AC.addName(name)),
    deleteName: name => dispatch(AC.deleteName(name)),
    save: () => dispatch(AC.saveChangeNames()),
    cancel: () => dispatch(AC.cancelChangeNames())
})

export default connect(MSTP, MDTP)(ModalSetting)