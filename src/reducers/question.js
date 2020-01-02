const initialState = {
    "qwestion": "Готов ли ты сыграть?"
}

const qwestionReducer = (state = initialState, action) => {
    switch (action.type){
        case "SET_QWESTION":
            let { qwestionText } = action
            return {
                ...state,
                qwestion: qwestionText 
            }
        default:
            return state
    }
}

export default qwestionReducer