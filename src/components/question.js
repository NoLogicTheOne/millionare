import React, { useState } from 'react';
import { Variant } from './variant';

import "./question.css"

export function Question({vars, rightVariant, rightIdx, next}) {
    let invert = Math.random() > 0.5 
    let variants = vars
    let rightArticle = "Статья " + rightVariant.articleNum
    let rightText = rightVariant.articleText
    let [answered, setAnswered] = useState(false)

    const nextQuestion = () => {
        for(let i = 0; i < 4; i++){
            marker(i, "transparent")
        }
        next()
        setAnswered(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(answered) {
            nextQuestion()
        } 
        let selectedIdx = getSelected()
        if(selectedIdx == -1) return
        
        setAnswered(true)
        if(selectedIdx == rightIdx){
            handleWin()
        } else {
            handleLose(selectedIdx)
        }
    }

    const marker = (idx, color) => {
        let index =  "label_answer" + idx
        let elem = document.getElementById(index)
        if(color){
            elem.style.backgroundColor = color
        } else {
            delete elem.backgroundColor
        }
        
    }

    const handleLose = (selectedIdx) => {
        marker(selectedIdx, "red")
        marker(rightIdx, "green")
    }
    
    const handleWin = () => {
        marker(rightIdx, "green")
    }


    const getSelected = () => {
        let group = document.getElementsByName("answer")

        for(let i = 0, len = group.length; i < len; i++){
            if(group[i].checked){
                return i
            }
        }

        return -1
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
                    invert={invert} 
                    variant={variant}/>)
            })
        }
        {
            answered
                ? <input type="submit" value="Готов ответить"/>
                : <input type="submit" value="Следующий вопрос"/>
        }
        </form>
    </>)
}