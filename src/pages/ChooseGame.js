import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Segment, Modal } from 'semantic-ui-react'

const ChooseGame = () => {
    return (<Modal open={true}>
        <Modal.Header>
            Выбор приложения
        </Modal.Header>
        <Segment>
            <Link to="/marga">
                <Button fluid positive>Markup vs. Margin</Button>
            </Link>
        </Segment>
        <Segment>
            <Link to="/codexes">
                <Button fluid positive>Codexes Game</Button>    
            </Link>
        </Segment>
    </Modal>)
}

export { ChooseGame }