import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Icon, Modal, Header, Button, Checkbox } from 'semantic-ui-react'

import { default as AC } from "../actionCreators"
// Codexes must be in states perhaps
// Or in state we need store only names, Codexes got by requests
import { Codexes } from '../middleware'

function ModalSetting(props) {
    let { names, modalOpen } = props
    let { modalToggle, addName, deleteName } = props
    
    const getCodexesCheckboxes = () => {
      
        return [...names].map(c => (<>
          <Checkbox 
            key={new Date()} 
            label={Codexes[c].header}
            onClick={e => {
                console.log(e)
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
    addName: name => dispatch(AC.addName()),
    deleteName: name => dispatch(AC.deleteName())
})

export default connect(MSTP, MDTP)(ModalSetting)