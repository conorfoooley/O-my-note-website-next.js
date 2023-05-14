import {
    setCookies,
    removeCookies
} from 'cookies-next'
import {
    AuthToken
} from "../services/auth_token";

import {
    AUTHENTICATE,
    LOGOUT,
    REQUEST_RESET_PASSWORD,
    CONFIRM_RESET_PASSWORD,
    GET_PROFILE,
    UPDATE_PROFILE,
    UPDATE_PROFILE_PHOTO
} from "../constants/Action_types";
import {
    authenticate,
    getUser,
    updateUser,
    updateUserPhoto,
    signOff,
    requestResetPassword,
    confirmResetPassword
} from '../api'


// import Router from "next/router";

export const login = (email, password, cb) => async dispatch => {

    try {
        const token = await authenticate({
            email,
            password
        }).catch(e => console.log(e))

        await AuthToken.storeToken(token.key);
        dispatch({
            type: AUTHENTICATE,
            payload: {
                token: token.key
            }
        })
        cb(token.key)
    } catch (err) {
        console.log(err)
    }
}

export const recoverPassword = (email, cb) => async dispatch => {

    try {
        await requestResetPassword({
            email
        }).catch(e => console.log(e))

        dispatch({
            type: REQUEST_RESET_PASSWORD,
            payload: null
        })
        cb()
    } catch (err) {
        console.log(err)
    }
}


export const confirmPasswordReset = (password, passwordConfirm, uid, token, cb) => async dispatch => {

    try {
        await confirmResetPassword({
            password,
            passwordConfirm,
            uid,
            token
        }).catch(e => console.log(e))

        dispatch({
            type: CONFIRM_RESET_PASSWORD,
            payload: null
        })
        cb()
    } catch (err) {
        console.log(err)
    }
}



export const logout = (token, cb) => async dispatch => {

    try {
        await signOff({
            token
        }).catch(e => console.log(e))

        removeCookies(null, 'token')
        dispatch({
            type: LOGOUT,
        })
        cb()
    } catch (err) {
        console.log(err)
    }
}

// TODO persist auth state


// get user 

export const getUserProfile = (token, cb) => async dispatch => {

    try {
        const user = await getUser({
            token
        }).catch(e => console.log("Test", e))

        dispatch({
            type: GET_PROFILE,
            payload: user
        })
        cb(user)
    } catch (err) {
        console.log(err)
    }
}

export const updateUserProfile = (user, id, token, cb) => async dispatch => {

    try {
        const userNew = await updateUser({
            user,
            id,
            token
        }).catch(e => console.log(e))


        dispatch({
            type: UPDATE_PROFILE,
            payload: userNew
        })
        cb(userNew)
        // Router.push('/ada')
    } catch (err) {
        console.log(err)
    }
}

export const updateUserProfilePhoto = (image, token, cb) => async dispatch => {

    try {
        const userNewImage = await updateUserPhoto({
            image,
            token
        }).catch(e => console.log(e))


        dispatch({
            type: UPDATE_PROFILE_PHOTO,
            payload: userNewImage
        })
        cb(userNewImage)
        // Router.push('/ada')
    } catch (err) {
        console.log(err)
    }
}