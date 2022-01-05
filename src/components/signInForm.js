import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormNavbar from './formNavbar'
import { signIn, signUp } from '../utils/authorisationService'
import './signInForm.css'

const SignInForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const isSigningIn = useSelector(state => state.generalState.isSigningIn)
    const dispatch = useDispatch()

    const handleUsernameInput = event => setUsername(event.target.value)
    const handlePasswordInput = event => setPassword(event.target.value)
    const handleSubmit = (e) => {
        e.preventDefault()
        isSigningIn ? signIn(username, password, dispatch) : signUp(username, password, dispatch)
    }
    const buttonClassName = isSigningIn ? 'sign-in-button' : 'sign-up-button'
    const buttonText = isSigningIn ? 'Sign in' : 'Sign up'
    return (
        <div className='sign-in-form'>
            <FormNavbar />
            <form>
                <label>
                    <p>Enter username</p>
                    <input onChange={handleUsernameInput}/><br/>
                </label>
                <label>
                    <p>Enter password</p>
                    <input type='password' onChange={handlePasswordInput}/><br/>
                </label>
                <button onClick={handleSubmit} className={buttonClassName}>{buttonText}</button>
            </form>
        </div>
    )
}

export default SignInForm