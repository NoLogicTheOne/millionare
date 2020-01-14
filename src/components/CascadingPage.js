import React from "react"
import { Button } from "semantic-ui-react"
import {default as AC} from "../actionCreators"
import { connect } from "react-redux"

const CascadingPage = (props) => {
    const {base} = props
    const {toDeep, toHight} = props

    const items = base.items || []
    const renderItem = (item, i) => (
        <Button fluid key={i} onClick={() => toDeep(item.id)}>
            {item.name}
        </Button>
    )
    return (<>
        <h3>{base.name}</h3>
        {items.map((c,i) => renderItem(c, i))}
        <Button onClick={() => toHight()}>
            Go back
        </Button>
    </>)
}

const MDTP = dispatch => ({
    toDeep: id => dispatch(AC.toDeep(id)),
    toHight: () => dispatch(AC.toHight())
})

export default connect(null, MDTP)(CascadingPage)