import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { Icon, Radio } from "semantic-ui-react"
 
import {default as CascadingPage} from "../components/CascadingPage"

const Cascading = (props) => {
    let { currentBase } = props
    
    return(<>
        <Link to="/marga">
            <Icon name="settings" size="big"/>
            Back to the Markup vs. Margin
        </Link>
        <br />
        <br />
        <Radio toggle label="Game Mode" className="cascading__game-mode-toggler"></Radio>
        <CascadingPage base={currentBase}/>
        
    </>)
}

const MSTP = state => state.cascading

export default connect(MSTP)(Cascading)