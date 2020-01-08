import React, { useState } from "react"
import { Input } from "semantic-ui-react"

const Marga = () => {
    let storageMarkup = localStorage.getItem("markup") || 0
    let storageMargin = localStorage.getItem("margin") || 0
    
    let [margin, setMargin] = useState(storageMargin)
    let [markup, setMarkup] = useState(storageMarkup)

    const update = (name, value) => {
        if(typeof +value !== "number") return
        console.log(name, " - ", value)
        if(name === "margin"){
            setMargin(+value)
        } else {
            setMarkup(+value)
        }
        localStorage.setItem(name, +value)
    }

    const format = num => Math.round(num)

    const updateMargin = markup => {
        console.log(markup)
        update("margin", format(markup * 100 / (100 + markup)))
    }
    const updateMarkup = margin => update("markup", format(margin * 100 / (100 - margin)))

    const handleChange = name => e => {
        update(name, e.target.value)
        if(name === "margin"){
            updateMarkup(margin)
        } else {
            updateMargin(markup)
        }
    } 

    return (<>
        
        <Input
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
        />
        <br />
        <br />
        <Input
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
        />
    </>)
}



export {Marga}