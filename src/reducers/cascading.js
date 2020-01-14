import { default as database } from "../codexes/database.json"

const initialState = {
    ...database,
    currentBase: {...database},
    breadcrumbs: [],
    parentBase: []
}

export default (state = initialState, action) => {
    const { id } = action
    let {parentBase} = state
    let {currentBase} = state
    let {breadcrumbs} = state
    
    switch (action.type){
        case "TO_DEEP":
            parentBase.push(currentBase)
            currentBase = currentBase.items.filter(c => c.id == id)[0]
            breadcrumbs.push(currentBase.name)
            return {
                ...state,
                parentBase,
                currentBase,
                breadcrumbs
            }
        case "TO_HIGHT":
            currentBase = parentBase.pop()
            breadcrumbs.pop()
            return {
                ...state,
                parentBase,
                currentBase,
                breadcrumbs
            }
        default:
            return state
    }
}