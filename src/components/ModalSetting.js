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
    
    const getCodexesCheckboxes = () => {
      
        return fullNames.map(currentName => (<>
          <Checkbox 
            key={new Date()} 
            label={Codexes[currentName].header}
            onClick={e => {
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
        {getCodexesCheckboxes()}
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={modalToggle}>
          <Icon name='checkmark' /> Сохранить
        </Button>
      </Modal.Actions>
    </Modal>)
}

const MSTP = state => state.settings 

const MDTP = dispatch => ({
    modalToggle: () => dispatch(AC.modalToggle()),
    addName: name => dispatch(AC.addName(name)),
    deleteName: name => dispatch(AC.deleteName(name))
})

export default connect(MSTP, MDTP)(ModalSetting)