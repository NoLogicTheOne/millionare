const initialState = {
    modalOpen: true,
    names: new Set([]), //keep state value
    savingNames: new Set([]), //save for cancel-function
    fullNames: ["UK", "UPK"]
}

export default (state = initialState, action) => {
    let { name } = action
    let { names } = state
    let { savingNames } = state

    switch(action.type){
        case "MODAL_TOGGLE":
            return {
                ...state,
                modalOpen: !state.modalOpen,
            }
        case "DELETE_NAME":
            names.delete(name)
            return state
        case "ADD_NAME":
            names.add(name)
            return state
        case "SAVE_CHANGE_NAMES":
            return {
                ...state,
                savingNames: names
            }
        case "CANCEL_CHANGE_NAMES":
            return {
                ...state,
                names: savingNames
            }
        default:
            return state
    }
}