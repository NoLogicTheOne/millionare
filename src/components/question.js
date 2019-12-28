import React, { useState } from 'react';
import { Variant } from './variant';

import "./question.css"

export function Question({vars, rightVariant, rightIdx, next}) {
    let invert = true
    let variants = vars
    let rightArticle = "Статья " + rightVariant.articleNum
    let rightText = rightVariant.articleText
    let colorsMask = {
        1: "transparent",
        2: "transparent",
        3: "transparent",
        4: "transparent"
    }

    let [selected, setSelected] = useState(-1)
    let [readyToAnswer, setReadyToAnswer] = useState(false)
    let [answered, setAnswered] = useState(false)
    let [colors, setColors] = useState(colorsMask)
    
    const nextQuestion = () => {
        for(let i = 0; i < 4; i++){
            marker(i)
        }
        setAnswered(false)
        invert = Math.random > 0.5
        next()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(selected == -1) return
        
        if(answered) {
            setAnswered(false)
            nextQuestion()
        } 

        if(selected == rightIdx){
            handleWin()
        } else {
            handleLose(selected)
        }
        setReadyToAnswer(false)
        setAnswered(true)
    }

    const marker = (idx, color) => {
        colorsMask[idx] = color
        setColors(colorsMask)
    }

    const handleLose = (selectedIdx) => {
        marker(selectedIdx, "red")
        marker(rightIdx, "green")
    }
    
    const handleWin = () => {
        marker(rightIdx, "green")
    }

    const onVariantClick = (idx) => () => {
        setSelected(idx)
        setReadyToAnswer(true)
    }

    return (<>
        <h3>
            {invert ? rightArticle : rightText}
        </h3>
        <form action="#" onSubmit={handleSubmit}>
        {
            variants.map((variant, idx) => {
                return (<Variant 
                    key={idx}
                    idx={idx}
                    color={colors[idx]}
                    checked={selected==idx}
                    handleClick={onVariantClick(idx)}
                    invert={invert}
                    variant={variant}/>)
            })
        }
        {
            readyToAnswer
                ? <input type="submit" value="Готов ответить"/>
                : <input type="submit" value="Следующий вопрос"/>
        }
        </form>
    </>)
}