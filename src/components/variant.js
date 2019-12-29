import React from 'react'

export const Variant = ({variant, invert, color, idx, showed, handleClick}) => {
    let answerIdx = "answer" + idx
    let num = variant.articleNum
    let text = variant.articleText
    let show = showed && !variant.isRight

    return (<>
        <div className="millionare__variant" 
            id={answerIdx}
            style={{"backgroundColor": color}}
            onClick={handleClick}>

            {invert 
                ? text + (show ? (" ( " + num + " )") : "") 
                : num + (show ? (" ( " + text + " )") : "")}
        </div>
    </>)
}
