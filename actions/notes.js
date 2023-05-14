import {
    GET_NOTES,
    GET_PERFUMES,
    GET_BRANDS,
    SEARCH_ALL,
    SEARCH_NOTES,
    SEARCH_PERFUMES,
    SEARCH_BRANDS,
    GET_CREATIONS
} from "../constants/Action_types";
import {
    fetchNotes,
    fetchPerfumes,
    fetchBrands,
    searchAll,
    searchNotes,
    searchPerfumes,
    searchBrands,
    fetchCreations
} from '../api'

// Get / fetch

export const getNotes = (offset, limit, token, cb) => async dispatch => {

    try {
        const notes = await fetchNotes({
            offset,
            limit,
            token
        }).catch(e => console.log(e))

        dispatch({
            type: GET_NOTES,
            payload: {
                notes: notes
            }
        })
        cb(notes)
    } catch (err) {
        console.log(err)
    }
}

export const getPerfumes = (offset, limit, token, cb) => async dispatch => {

    try {
        const perfumes = await fetchPerfumes({
            offset,
            limit,
            token
        }).catch(e => console.log(e))

        dispatch({
            type: GET_PERFUMES,
            payload: {
                perfumes: perfumes
            }
        })
        cb(perfumes)
    } catch (err) {
        console.log(err)
    }
}

export const getBrands = (offset, limit, token, cb) => async dispatch => {

    try {
        const brands = await fetchBrands({
            offset,
            limit,
            token
        }).catch(e => console.log(e))
        dispatch({
            type: GET_BRANDS,
            payload: {
                brands: brands
            }
        })
        cb(brands)
    } catch (err) {
        console.log(err)
    }
}

// Search

export const searchInAll = (searchTerm, token, cb) => async dispatch => {

    try {
        const hits = await searchAll({
            searchTerm,
            token
        }).catch(e => console.log(e))

        dispatch({
            type: SEARCH_ALL,
            payload: {
                hits: hits
            }
        })
        cb(hits)
    } catch (err) {
        console.log(err)
    }
}

export const searchInNotes = (searchTerm, token, cb) => async dispatch => {

    try {
        const notes = await searchNotes({
            searchTerm,
            token
        }).catch(e => console.log(e))

        dispatch({
            type: SEARCH_NOTES,
            payload: {
                notes: notes
            }
        })
        cb(notes)
    } catch (err) {
        console.log(err)
    }
}

export const searchInPerfumes = (searchTerm, token, cb) => async dispatch => {

    try {
        const perfumes = await searchPerfumes({
            searchTerm,
            token
        }).catch(e => console.log(e))

        dispatch({
            type: SEARCH_PERFUMES,
            payload: {
                perfumes: perfumes
            }
        })
        cb(perfumes)
    } catch (err) {
        console.log(err)
    }
}


export const searchInBrands = (searchTerm, token, cb) => async dispatch => {

    try {
        const brands = await searchBrands({
            searchTerm,
            token
        }).catch(e => console.log(e))

        dispatch({
            type: SEARCH_BRANDS,
            payload: {
                brands: brands
            }
        })
        cb(brands)
    } catch (err) {
        console.log(err)
    }
}



export const getCreations = (token, cb) => async dispatch => {

    try {
        const creations = await fetchCreations({
            token
        }).catch(e => console.log(e))

        dispatch({
            type: GET_CREATIONS,
            payload: {
                creations: creations
            }
        })
        cb(creations)
    } catch (err) {
        console.log(err)
    }
}