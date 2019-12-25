import React from 'react'

export const Variant = ({variant, invert, idx, marker}) => {
    let answerIdx = "answer" + idx
    
    return (<>
        <input className="millionare__input"
            type="radio" 
            value={idx}
            name="answer" 
            id={answerIdx}/>
        <label htmlFor={answerIdx}
            id={"label_" + answerIdx}
            className="millionare__variant">
            {invert ? variant.articleText : variant.articleNum}
        </label>
    </>)
}
