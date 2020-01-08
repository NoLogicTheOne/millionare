import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { connect } from "redux"

const ChooseGame = () => {
    return (<>
        <Link to="/marga">
            <Button positive>Markup vs. Margin</Button>
        </Link>
        <Link to="/codexes">
            <Button positive>Codexes Game</Button>    
        </Link>
    </>)
}

export { ChooseGame }