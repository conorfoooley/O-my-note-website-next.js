import {
    AUTHENTICATE,
    LOGOUT,
    GET_PROFILE,
    UPDATE_PROFILE
} from "../constants/Action_types";

const exampleInitialState = {
    user: null,
    token: null,
    loggedIn: false
}


const auth = (state = exampleInitialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return Object.assign({}, state, {

                user: action.payload.user,
                token: action.payload.token,
                loggedIn: Object.keys(action.payload.token).length > 0 ? true : false
            })
        case GET_PROFILE:
            return Object.assign({}, state, {

                user: action.payload.user,
            })

        case UPDATE_PROFILE:
            return Object.assign({}, state, {

                user: action.payload.userNew,
            })

        case LOGOUT:
            return Object.assign({}, state, {

                user: null,
                token: null,
                loggedIn: null
            })
        default:
            return state
    }
}

export default auth