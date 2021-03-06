import React from "react"
import { Button } from "semantic-ui-react"
import {default as AC} from "../actionCreators"
import { connect } from "react-redux"

const CascadingPage = (props) => {
    const {base} = props
    const {parentBase, breadcrumbs} = props
    const {toDeep, toHight} = props

    const {items = []} = base

    const renderItem = (item, i) => (
        <Button fluid key={i} onClick={() => toDeep(item.id)}>
            {item.name}
        </Button>
    )
    const renderBack = () => (<Button content="Go back" icon='left arrow' labelPosition='left' onClick={() => toHight()}/>
    )
    const renderBreadcrumbs = breadcrumbs => 
        breadcrumbs.reduce((acc, curr) => acc ? acc + " > " + curr : curr, "")

    return (<>
        <h3>{renderBreadcrumbs(breadcrumbs)}</h3>
        {items.map((c,i) => renderItem(c, i))}
        {parentBase.length ? renderBack() : null}
    </>)
}

const MSTP = state => state.cascading

const MDTP = dispatch => ({
    toDeep: id => dispatch(AC.toDeep(id)),
    toHight: () => dispatch(AC.toHight())
})

export default connect(MSTP, MDTP)(CascadingPage)