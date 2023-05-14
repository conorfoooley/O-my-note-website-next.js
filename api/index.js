import axios from 'axios'
/*export const uri = 'http://127.0.0.1:8000/'*/
// export const uri = 'https://dev.ohmynote.com'
export const uri = 'https://api.ohmynote.com/'
/*export const uri = 'https://react.ohmynote.com'*/

const fetcher = axios.create({
    baseURL: uri,
    headers: {
        'Content-Type': 'application/json'
    }
})


export const authenticate = async ({
                                       email,
                                       password
                                   }) => {

    return fetcher.post(`/rest-auth/login/`, {
        email: email,
        password: password
    }).then(res => res.data).catch(e => console.log('auth', e))
}

export const signOff = async ({
                                  token
                              }) => {

    return fetcher.post(`/rest-auth/logout/`, {}, {
        headers: {
            'Authorization': `Token ${token}`
        }
    }).then(res => res.data).catch(e => console.log('auth', e))
}

export const requestResetPassword = async ({
                                               email
                                           }) => {

    return fetcher.post(`/rest-auth/password/reset/`, {
        email: email
    }).then(res => res.data).catch(e => console.log('auth', e))
}

export const confirmResetPassword = async ({
                                               password,
                                               passwordConfirm,
                                               uid,
                                               token
                                           }) => {

    return fetcher.post(`/rest-auth/password/reset/confirm/`, {
        new_password1: password,
        new_password2: passwordConfirm,
        uid,
        token
    }).then(res => res.data).catch(e => console.log('auth', e))
}

// Get / Fetch data

export const fetchNotes = async ({
                                     offset,
                                     limit,
                                     token
                                 }) => {

    return fetcher.get(`/api/ada/note/?limit=${limit}&offset=${offset}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
        .then(res => res.data).catch(e => console.log('notes', e))
}

export const fetchPerfumes = async ({
                                        offset,
                                        limit,
                                        token
                                    }) => {
    return fetcher.get(`/api/ada/perfume/?limit=${limit}&offset=${offset}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
        .then(res => res.data).catch(e => console.log('perfumes', e))
}

export const fetchBrands = async ({
                                      offset,
                                      limit,
                                      token
                                  }) => {
    return fetcher.get(`/api/ada/brand/?limit=${limit}&offset=${offset}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
        .then(res => res.data).catch(e => console.log('brands', e))
}

export const getNote = async (id, token) => {
    return fetcher.get(`/api/ada/note/${id}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    }).then(res => res.data).catch(e => console.log('notes', e))
}
export const getBrand = async (id, token) => {
    return fetcher.get(`/api/ada/brand/${id}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    }).then(res => res.data).catch(e => console.log('notes', e))
}
export const getPerfume = async (id, token) => {

    return fetcher.get(`/api/ada/perfume/${id}/`, {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        // console.log(res.data)
        return res.data
    }).catch(e => console.log('notes', e))
}


export const getNoteScore = async (id, year, token) => {

    return fetcher.get(`/api/ada/note_score/${id}/${year}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    }).then(res => res.data).catch(e => console.log('notes', e))
}

export const getNoteScoreByMonth = async (id, year, token, country) => {

    return fetcher.get(`/api/ada/note_score_by_month/${id}/${year}/${country}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    }).then(res => res.data).catch(e => console.log('notes', e))
}


// Search

export const searchAll = async ({
                                    searchTerm,
                                    token
                                }) => {

    return fetcher.get(`/api/ada/search/${searchTerm}?limit=${5}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    }).then(res => res.data).catch(e => console.log('search all', e))
}

export const searchNotes = async ({
                                      searchTerm,
                                      token
                                  }) => {
    return fetcher.get(`/api/ada/note?search=${searchTerm}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    }).then(res => res.data).catch(e => console.log('search notes', e))
}

export const searchPerfumes = async ({
                                         searchTerm,
                                         token
                                     }) => {
    return fetcher.get(`/api/ada/perfume/?search=${searchTerm}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    }).then(res => res.data).catch(e => console.log('search perfumes', e))
}

export const searchBrands = async ({
                                       searchTerm,
                                       token
                                   }) => {
    return fetcher.get(`/api/ada/brand/?search=${searchTerm}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    }).then(res => res.data).catch(e => console.log('search notes', e))
}


// User management 

// get User

export const getUser = async ({
                                  token
                              }) => {
    return fetcher.get(`/clients/client/`, {
        headers: {
            'Authorization': `Token ${token}`,
            'Accept': 'application/json',
           // 'content-type': 'application/json'
        }
    })
        .then(res => {
            console.log("this is get user",res.data)
            return res.data
        }).catch(e => console.log('get user', e))
}

// Edit User Info

export const updateUser = async ({
                                     user,
                                     id,
                                     token
                                 }) => {

    return fetcher.put(
        `/authentication/profile/${id}`,
        user, {
            headers: {
                'Authorization': `Token ${token}`,
                'content-type': 'multipart/form-data'
            }
        }
    ).then(res => res.data).catch(e => console.log('update user', e))
}

export const updateUserPhoto = async ({
                                    image,
                                    token
                                }) => {
    return fetcher.post(
        `/clients/photo/`,
        image,{
            headers: {
                'Authorization': `Token ${token}`,
                'content-type': 'multipart/form-data',
                'Accept': 'application/json',
            }
        }
    ).then(res => res.data).catch(e => console.log('update user', e))
}

export const demoRequest = async ({
                                      form
                                  }) => {
    return fetcher.post(
        `/api/public/requestdemo`,
        form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        },
    ).then(res => res.data).catch(e => console.log('request a demo', e))
}

export const signUpforNewsletter = async ({
                                              email
                                          }) => {
    return fetcher.post(
        `/api/public/newsletter`,
        email, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        },
    ).then(res => res.data).catch(e => console.log('newsletter sign up', e))
}
export const contactRequest = async ({
                                         form
                                     }) => {
    return fetcher.post(
        `/api/public/contact`,
        form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        },
    ).then(res => res.data).catch(e => console.log('request a demo', e))
}

export const fetchCreations = async (token) => {
    return fetcher.get(`/api/ada2/creation`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    }).then(res => res.data).catch(e => console.log('Creations', e))
}

export const fetchCreation = async (token, year, id, country) => {
    return fetcher.post(`api/ada2/creation/${year}/${id}/${country}`, {}, {
        headers: {
            'Authorization': `Token ${token}`
        }
    }).then(res => {
        // console.log(res.data)
        return res.data
    }).catch(e => console.log('Creation', e))
}

export const fetchPerfumeList = async (token) => {
    return fetcher.get(`api/ada/perfumelist`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    }).then(res => res.data).catch(e => console.log('Perfumes', e))
}

export const fetchNoteList = async (token) => {
    return fetcher.get(`api/ada/note`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    }).then(res => {
        // console.log(res.data)
        return res.data
    }).catch(e => console.log('Notes', e))
}

export const fetchScentFamily = async (token) => {
    return fetcher.get(`api/ada/scentfamily`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    }).then(res => res.data).catch(e => console.log('Scent Family', e))
}

export const storeScent = async (token, scent) => {
    return fetcher.post(`api/ada/notescent/`, scent, {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        // console.log(res.data)
        return res.data
    }).catch(e => console.log('Store Scent', e))

}
export const getDashboardData = async (token) => {
    return fetcher.get(`api/dashboard/summary`, {
        headers: {
            'Authorization': `Token ${token}`,
        }
    })
    .then(res => {
        return res.data
    }).catch(e => console.log('get DashboardData', e))
}
export const getCountries = async (token) => {
    return fetcher.get(`api/dashboard/country-filter/`,{
        headers: {
            'Authorization': `Token ${token}`,
            'Accept': 'application/json',
        }
    })
    .then(res => {
        return res.data
    }).catch(e => console.log('get countries', e))
}
export const getBrands = async (token) => {
    return fetcher.get(`api/dashboard/brand-filter/`,{
        headers: {
            'Authorization': `Token ${token}`,
            'Accept': 'application/json',
        }
    })
    .then(res => {
        return res.data
    }).catch(e => console.log('get brands', e))
}
export const searchDashboardDataByFilter = async (year, month, countries, channel, token) => {
    return fetcher.get(`api/dashboard/summary/?year=${year}&month=${month}&countries=${countries}&channel=${channel}`, {
    headers: {
    'Authorization': `Token ${token}`,
    }
    })
    .then(res => {
        return res.data
    }).catch(e => console.log('search by filter', e))
}
export const searchProductsByFilter = async (page, brands, gender, categories, token) => {
    return fetcher.get(`api/dashboard/product/?page=${page}&brands=${brands}&gender=${gender}&categories=${categories}`, {
    headers: {
    'Authorization': `Token ${token}`,
    }
    })
    .then(res => {
        return res.data
    }).catch(e => console.log('search by filter', e))
}
export const getProduct = async (page,token) => {
    return fetcher.get(`api/dashboard/product?page=${page}`, {
    headers: {
    'Authorization': `Token ${token}`,
    }
    })
    .then(res => {
        return res.data
    }).catch(e => console.log('get product', e))
}
export const getProductDetail = async (token,id) => {
    return fetcher.get(`api/dashboard/product/${id}`, {
    headers: {
    'Authorization': `Token ${token}`,
    }
    })
    .then(res => {
        return res.data
    }).catch(e => console.log('get product detail', e))
}
export const searchProduct = async (token,searchTerm) => {
    return fetcher.get(`/api/dashboard/product/?search=${searchTerm}`, {
    headers: {
    'Authorization': `Token ${token}`
    }
    })
    .then(res => { 
       return res.data
    }).catch(e => console.log('search Product', e))
}
// export const getClients = async (token) => {
//     return fetcher.get(`clients/clients`, {
//         headers: {
//             'Authorization': `Token ${token}`
//         }
//     }).then(res => {
//         console.log(res)

//         return res.data
//     }).catch(e => console.log('Client Error', e))
// }