const initialState = {
    modalOpen: true,
    names: new Set([]),
    fullNames: ["UK", "UPK"]
}

export default (state = initialState, action) => {
    let { name } = action
    let { names } = state

    switch(action.type){
        case "MODAL_TOGGLE":
            return {
                ...state,
                modalOpen: !state.modalOpen
            }
        case "DELETE_NAME":
            names.delete(name)
            console.log("reducerName - ", name)
            return{
                ...state,
                names
            }
        case "ADD_NAME":
            names.add(name)
            return {
                ...state,
                names
            }
        default:
            return state
    }
}