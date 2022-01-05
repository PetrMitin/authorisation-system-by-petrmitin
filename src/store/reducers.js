import {combineReducers} from 'redux'

const SET_USER_ID = 'SET_USER_ID'
const SET_IS_SIGNING_IN = 'SET_IS_SIGNING_IN'
const SET_IS_SIGNED_IN = 'SET_IS_SIGNED_IN'

const defaultUser = {
    userId: ''
}
const defaultGeneralState = {
    isSigningIn: true,
    isSignedIn: false
}

const userReducer = (state = defaultUser, action) => {
    switch(action.type) {
        case SET_USER_ID:
            return {...state, userId: action.payload}
        default:
            return state
    }
}

const generalStateReducer = (state = defaultGeneralState, action) => {
    switch(action.type) {
        case SET_IS_SIGNING_IN:
            return {...state, isSigningIn: action.payload}
        case SET_IS_SIGNED_IN:
            return {...state, isSignedIn: action.payload}
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    user: userReducer,
    generalState: generalStateReducer
})
export const setIsSigningInAction = payload => ({type: SET_IS_SIGNING_IN, payload})
export const setIsSignedInAction = payload => ({type: SET_IS_SIGNED_IN, payload})
export const setUserIdAction = payload => ({type: SET_USER_ID, payload})