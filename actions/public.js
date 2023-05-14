import { DEMO_REQUEST, NEWSLETTER_SIGNUP, CONTACT_REQUEST } from "../constants/Action_types";
import { demoRequest, signUpforNewsletter, contactRequest } from '../api'


export const requestDemo = (form, cb) => async dispatch => {

    try {
        await demoRequest({ form }).catch(e => console.log(e))

        dispatch({
            type: DEMO_REQUEST,
        })
        cb()
    } catch (err) {
        console.log(err)
    }
}

export const newsletterSignUp = (email, cb) => async dispatch => {
    try {
        await signUpforNewsletter({ email: email }).catch(e => console.log(e))

        dispatch({
            type: NEWSLETTER_SIGNUP,
        })
        cb()
    } catch (err) {
        console.log(err)
    }
} 

export const contactUs = (form, cb) => async dispatch => {

    try {
        await contactRequest({ form }).catch(e => console.log(e))

        dispatch({
            type: CONTACT_REQUEST,
        })
        cb()
    } catch (err) {
        console.log(err)
    }
}