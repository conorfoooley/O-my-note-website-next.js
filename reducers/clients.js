import {
    ADD_CLIENTS,
    ADD_CLIENTS_REQUEST,
    CREATE_CLIENT_MODAL,
    GET_CLIENTS,
    GET_CLIENTS_REQUEST,
    GET_EVENTS,
    INVITE_CLIENT
} from '../constants/Action_types'

const initialState = {
    clients: [],
    client: {},
    loading: null,
    message: "",
    newClient: false,
    next: "",
    prev: "",
    count: 0,
    status: null,
    events: []
}

const clientReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CLIENTS_REQUEST:
            return {
                ...state,
                loading: true
            }
            case GET_CLIENTS:
                return {
                    ...state,
                    clients: action.payload,
                        next: action.next,
                        prev: action.prev,
                        count: action.count,
                        loading: false
                }

                case ADD_CLIENTS_REQUEST:
                    return {
                        ...state,
                        loading: true,
                            status: null,
                            message: null
                    }

                    case ADD_CLIENTS:
                        return {
                            ...state,
                            client: action.payload,
                                loading: false,
                                message: "New client has been added",
                                newClient: false
                        }
                        case CREATE_CLIENT_MODAL:
                            return {
                                ...state,
                                newClient: action.payload
                            }

                            case INVITE_CLIENT:
                                return {
                                    ...state,
                                    loading: false,
                                        message: action.payload,
                                        status: action.status,
                                        newClient: false
                                }

                                case GET_EVENTS:
                                    return {
                                        ...state,
                                        events: action.payload
                                    }
                                    default:
                                        return state
    }
}

export default clientReducer