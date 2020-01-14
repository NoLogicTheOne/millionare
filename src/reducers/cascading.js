import { default as database } from "../codexes/database.json"

const initialState = {
    ...database,
    currentBase: {...database},
    parentBase: []
}

export default (state = initialState, action) => {
    const { id } = action
    let {parentBase} = state
    let {currentBase} = state
    
    switch (action.type){
        case "TO_DEEP":
            parentBase.push(currentBase)
            currentBase = currentBase.items.filter(c => c.id == id)[0]
            return {
                ...state,
                parentBase,
                currentBase
            }
        case "TO_HIGHT":
            currentBase = parentBase.pop()
            return {
                ...state,
                parentBase,
                currentBase
            }
        default:
            return state
    }
}