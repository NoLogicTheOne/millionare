import React, { useState } from "react"
import { Input, Header, Icon } from "semantic-ui-react"
import { Link } from "react-router-dom"

import "./marga.css"

const Marga = () => {
    let storageMarkup = localStorage.getItem("markup") || ""
    let storageMargin = localStorage.getItem("margin") || ""
    
    let [margin, setMargin] = useState(storageMargin)
    let [markup, setMarkup] = useState(storageMarkup)
    let [iconSize, setIconSize] = useState("h1")

    const update = (name, value) => {
        let val = format(value)
        if(name === "margin"){
            setMargin(val)
        } else {
            setMarkup(val)
        }
        localStorage.setItem(name, val)
    }

    const format = num => new String(Math.round(num)).replace(/^0+/, '')

    const updateMargin = markup => {
        let newValue = markup * 100 / (100 + Number(markup))
        update("margin", newValue)
    }
    const updateMarkup = margin => {
        let newValue = margin * 100 / (100 - margin)
        update("markup", newValue)
    }

    const handleChange = name => e => {
        let value = e.target.value
        update(name, value)
        if(name === "margin"){
            updateMarkup(value)
        } else {
            updateMargin(value)
        }
    } 

    return (<>
        <br/>
        <Header as={iconSize} icon textAlign="center">
            <Link to="/cascading">
                <Icon name='settings' size="small" className={"marga__icon-small"}/>
            </Link>
            Markup vs. Margin
            <Header.Subheader>
            Просто вводи числа, любимая женушка!
            </Header.Subheader>
        </Header>
        <br/>
        <br/>
        <Input fluid
            action={{
                color: 'teal',
                labelPosition: 'left',
                icon: 'cart',
                content: 'Markup',
                style: {fontSize: "1.4rem"}
            }}
            style={{fontSize: "2rem"}}
            type="number"
            min="0"
            actionPosition='left'
            value={format(markup)}
            onChange={handleChange("markup")}
            onFocus={e=> {
                setIconSize("h4")
                update("markup", 0)
            }}
            onBlur={e=> {
                setIconSize("h2")
            }}
        />
        <br />
        <Input fluid
            action={{
                color: 'teal',
                labelPosition: 'left',
                icon: 'cart',
                content: 'Margin',
                style: {fontSize: "1.4rem"}
            }}
            style={{fontSize: "2rem"}}
            actionPosition='left'
            type="number"
            min="0"
            max="100"
            value={format(margin)}
            onChange={handleChange("margin")}
            onFocus={e=> {
                setIconSize("h4")
                update("margin", 0)
            }}
            onBlur={e=> {
                setIconSize("h2")
            }}
        />
    </>)
}

export {Marga}