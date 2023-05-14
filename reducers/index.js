import {
    combineReducers
} from 'redux'


import auth from "./auth";
import clientReducer from './clients';
import notes from './notes'


const root = combineReducers({
    auth: auth,
    notes: notes,
    clients: clientReducer
})

export default root