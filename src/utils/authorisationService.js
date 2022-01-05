import api from './axiosInstance'
import { setIsSignedInAction, setUserIdAction } from '../store/reducers'
import axios from 'axios'

const baseUrl = 'https://authorisation-system-by-petrmitin.vercel.app/api'

const signIn =  async (username, password, dispatch) => {
    try {
        const response = await api.post('/sign-in', {user: {username, password}})
        const {accessToken, userId} = response.data
        localStorage.setItem('token', accessToken)
        dispatch(setIsSignedInAction(true))
        dispatch(setUserIdAction(userId))
    } catch (e) {
        console.log(e)
        alert('Incorrect username or password!')
        signOut(dispatch)
    }
}
const signOut = async dispatch => {
    try {
        await api.post('/sign-out')
        localStorage.removeItem('token')
        dispatch(setIsSignedInAction(false))
        dispatch(setUserIdAction(''))
    } catch(e) {
        console.log(e)
    }
}
const signUp = async (username, password, dispatch) => {
    try {
        const response = await api.post('/sign-up', {user: {username, password}})
        const {accessToken, userId} = response.data
        localStorage.setItem('token', accessToken)
        dispatch(setIsSignedInAction(true))
        dispatch(setUserIdAction(userId))
    } catch (e) {
        console.log(e)
        alert('Incorrect username, try something else!')
        signOut(dispatch)
    }
} 

const checkIfSignedIn = async dispatch => {
    try {
        const response = await axios.get(`${baseUrl}/refresh-tokens`, {withCredentials: true})
        const {accessToken, userId} = response.data
        localStorage.setItem('token', accessToken)
        dispatch(setIsSignedInAction(true))
        dispatch(setUserIdAction(userId))
    } catch(e) {
        console.log(e)
        signOut(dispatch)
    }
}

export {signIn, signOut, signUp, checkIfSignedIn}