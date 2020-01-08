const APPS = [
    "CodexesGame",
    "Markup vs Margin"
]

const initialState = {
    app: localStorage.getItem("app") || APPS[0],
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
        case "CHANGE_APP":
            let app = state.app == "CodexesGame" ? "Markup vs Margin" : "CodexesGame" 
            return {
                ...state,
                app
            }
        case "MODAL_TOGGLE":
            return {
                ...state,
                modalOpen: !state.modalOpen,
            }
        case "DELETE_NAME":
            names.delete(name)
            return {
                ...state,
                names
            }
        case "ADD_NAME":
            names.add(name)
            return {
                ...state,
                names
            }
        case "SAVE_CHANGE_NAMES":
            localStorage.setItem("app", state.app)
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