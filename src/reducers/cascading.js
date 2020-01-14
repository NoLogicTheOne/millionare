import { default as database } from "../codexes/database.json"

const initialState = {
    ...database,
    currentBase: {...database}
}

export default (state = initialState, action) => {
    switch (action.type){
        default:
            return state
    }
}