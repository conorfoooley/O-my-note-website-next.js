import {
    GET_NOTES,
    GET_PERFUMES,
    GET_CREATIONS
} from "../constants/Action_types";

const exampleInitialState = {
    notes: [],
    creations: []
}

const notes = (state = exampleInitialState, action) => {
    switch (action.type) {
        case GET_NOTES:
            return Object.assign({}, state, {
                notes: action.payload.notes,
            })

        case GET_PERFUMES:
            return Object.assign({}, state, {
                perfumes: action.payload.notes,
            })

        case GET_CREATIONS:
            return Object.assign({}, state, {
                creations: action.payload.creations,
            })

        default:
            return state
    }
}

export default notes