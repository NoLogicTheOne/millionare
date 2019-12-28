import React from 'react'

export const Variant = ({variant, invert, color, idx, checked, handleClick}) => {
    let answerIdx = "answer" + idx
    
    return (<>
        <div className="millionare__variant" 
            id={answerIdx}
            style={{"backgroundColor": color}}
            onClick={handleClick}>

            {invert ? variant.articleText : variant.articleNum}
        </div>
    </>)
}
