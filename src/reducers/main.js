import actionCreators from "../actionCreators"

const initialState = {
    "count_wins": 0,
    "count_loose": 0,
    "question": "Нет вопроса",
    "invert": true,
    "vars": {},
    "names": []
}

export default (state = initialState, action) => {
    switch(action.type){
        case "REFRESH_INVERT":
            return {
                ...state,
                invert: Math.random() > 0.5
            }
    }
    return state
}