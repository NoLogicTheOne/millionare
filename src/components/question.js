import React, { useState } from 'react';
import { Variant } from './variant';

import "./question.css"
import { connect } from 'react-redux';
import {default as AC} from "../actionCreators"

function Question(props) {
    
    let {
        invert, 
        vars, 
        rightVariant,
        rightIdx,
        addCount,
        setQuestion,
        refreshInvert
    } = props

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
    let [showed, setShowed] = useState(false)
    let [win, setWin] = useState(false)
    
    const nextQuestion = () => {
        cleanAll()
        setAnswered(false)
        setReadyToAnswer(false)
        setShowed(false)
        addCount(win)
        setQuestion()
        refreshInvert()
    }

    const handleCheck = (e) => {
        if(selected === -1) return
        
        if(answered) {
            setAnswered(false)
            nextQuestion()
        } 
        setWin(false)
        if(selected === rightIdx){
            handleWin()
        } else {
            handleLose(selected)
        }
        setShowed(true)
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
        setWin(true)
    }

    const onVariantClick = (idx) => () => {
        if(readyToAnswer && (selected === idx)){
            handleCheck()
            return
        }
        if(answered){
            return
        }
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
                    checked={selected === idx}
                    handleClick={onVariantClick(idx)}
                    invert={invert}
                    showed={showed}
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

const MSTP = state => {
    return ({
        ...state.question.question,
        names: state.settings.names,
        invert: state.main.invert
    })
}

const MDTP = dispatch => ({
    dispatch,
    refreshInvert: () => dispatch(AC.refreshInvert()),
    addCount: isWin => dispatch(AC.addCount(isWin)),
})

const MP = (state, dispatchProps) => {
    let { names } = state
    let { dispatch } = dispatchProps
    
    return ({
        ...state,
        ...dispatchProps,
        setQuestion: () => dispatch(AC.setQuestion(names))
    })
}

export default connect(MSTP, MDTP, MP)(Question)