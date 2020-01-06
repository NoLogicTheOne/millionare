const initialState = {
    "count_wins": 0,
    "count_loose": 0,
    "invert": true
}

export default (state = initialState, action) => {
    switch(action.type){
        case "REFRESH_INVERT":
            return {
                ...state,
                invert: Math.random() > 0.5
            }
        case "ADD_COUNT":
            let { isWin } = action
            console.log(state)
            return {
                ...state,
                count_wins: state.count_wins + Number(!!isWin),
                count_loose: state.count_loose + Number(!isWin)
            }
    }
    return state
}