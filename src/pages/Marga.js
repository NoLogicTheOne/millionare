import React, { useState } from "react"
import { Input, Header, Icon } from "semantic-ui-react"

const Marga = () => {
    let storageMarkup = localStorage.getItem("markup") || ""
    let storageMargin = localStorage.getItem("margin") || ""
    
    let [margin, setMargin] = useState(storageMargin)
    let [markup, setMarkup] = useState(storageMarkup)

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
        <Header as='h1' icon textAlign="center">
            <Icon name='settings' />
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
            role="number"
            min="0"
            actionPosition='left'
            value={format(markup)}
            onChange={handleChange("markup")}
            onFocus={e=>update("markup", 0)}
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
            onFocus={e=>update("margin", 0)}
        />
    </>)
}

export {Marga}