import React from 'react'

export const Variant = ({variant, invert, color, idx, checked, handleClick}) => {
    let answerIdx = "answer" + idx
    
    return (<>
        <input className="millionare__input"
            type="radio" 
            value={idx}
            name="answer" 
            id={answerIdx}
            style={{backgroundColor: color}}
            onChange={handleClick}
            checked={checked}/>
        <label htmlFor={answerIdx}
            id={"label_" + answerIdx}
            className="millionare__variant">
            {invert ? variant.articleText : variant.articleNum}
        </label>
    </>)
}
