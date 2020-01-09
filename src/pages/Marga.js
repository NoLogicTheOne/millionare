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
        let newValue = markup * 100 / (100 + +markup)
        console.log(markup ," - ", newValue)
        update("margin", newValue)
    }
    const updateMarkup = margin => {
        let newValue = margin * 100 / (-margin + 100)
        update("markup", newValue)
    }

    const handleChange = name => e => {
        let value = e.target.value
        update(name, value)
        if(name === "margin"){
            updateMarkup(value)
        } else {
            console.log(value)
            updateMargin(value)
        }
    } 

    return (<>
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
            }}
            role="number"
            min="0"
            actionPosition='left'
            value={format(markup)}
            onChange={handleChange("markup")}
            onBlur={handleChange("markup")}
            onFocus={e=>update("markup", 0)}
        />
        <br />
        <Input fluid
            action={{
                color: 'teal',
                labelPosition: 'left',
                icon: 'cart',
                content: 'Margin'
            }}
            actionPosition='left'
            type="number"
            min="0"
            max="100"
            value={format(margin)}
            onChange={handleChange("margin")}
            onBlur={handleChange("margin")}
            onFocus={e=>update("margin", 0)}
        />
    </>)
}



export {Marga}