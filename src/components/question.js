import React, { useState } from 'react';
import { Variant } from './variant';

import "./question.css"

export function Question({vars, rightVariant, rightIdx, next}) {
    let invert = true
    let variants = vars
    let rightArticle = "Статья " + rightVariant.articleNum
    let rightText = rightVariant.articleText
    let defaultColors = {
        0: "transparent",
        1: "transparent",
        2: "transparent",
        3: "transparent"
    }

    let [selected, setSelected] = useState(-1)
    let [readyToAnswer, setReadyToAnswer] = useState(false)
    let [answered, setAnswered] = useState(false)
    let [colors, setColors] = useState(defaultColors)
    
    const nextQuestion = () => {
        cleanAll()
        setAnswered(false)
        setReadyToAnswer(false)
        invert = Math.random > 0.5
        next()
    }

    const handleCheck = (e) => {
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

    const marker = (idx, color="transparent") => {
        let newMask = colors
        newMask[idx] = color
        setColors(newMask)
    }

    function cleanAll() {
        for(let i = 0; i < 4; i++){
            marker(i)
        }
    }

    const handleLose = (selectedIdx) => {
        marker(selectedIdx, "red")
        marker(rightIdx, "green")
    }
    
    const handleWin = () => {
        marker(rightIdx, "green")
    }

    const onVariantClick = (idx) => () => {
        cleanAll()
        setSelected(idx)
        setReadyToAnswer(true)
        marker(idx, "yellow")
    }

    return (<>
        <h3>
            {invert ? rightArticle : rightText}
        </h3>
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
                ? <button onClick={handleCheck}>Готов ответить</button>
                : <button onClick={nextQuestion}>Следующий вопрос</button>
        }
    </>)
}