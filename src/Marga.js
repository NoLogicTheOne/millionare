import React, { useState } from "react"
import { Input, Header, Icon } from "semantic-ui-react"

const Marga = () => {
    let storageMarkup = localStorage.getItem("markup") || ""
    let storageMargin = localStorage.getItem("margin") || ""
    
    let [margin, setMargin] = useState(storageMargin)
    let [markup, setMarkup] = useState(storageMarkup)

    const update = (name, value) => {
        if(typeof +value !== "number") return
        if(name === "margin"){
            setMargin(+value)
        } else {
            setMarkup(+value)
        }
        localStorage.setItem(name, +value)
    }

    const format = num => Math.round(num)

    const updateMargin = markup => {
        update("margin", format(markup * 100 / (100 + markup)))
    }
    const updateMarkup = margin => update("markup", format(margin * 100 / (100 - margin)))

    const handleChange = name => e => {
        let value = e.target.value
        update(name, value)
        if(name === "margin"){
            updateMarkup(margin)
        } else {
            updateMargin(markup)
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
            type="number"
            min="0"
            actionPosition='left'
            value={format(markup)}
            onChange={handleChange("markup")}
            onBlur={handleChange("markup")}
            onFocus={e=>update("markup", "")}
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
            onFocus={e=>update("margin", "")}
        />
    </>)
}



export {Marga}