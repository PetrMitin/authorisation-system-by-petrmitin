import { useDispatch } from "react-redux"
import { setIsSigningInAction } from "../store/reducers"
import './formNavbar.css'

const FormNavbar = () => {
    const dispatch = useDispatch()
    const goToSignIn = () => {
        dispatch(setIsSigningInAction(true))
    }

    const goToSignUp = () => {
        dispatch(setIsSigningInAction(false))
    }

    return (
        <div className='form-navbar'>
            <span onClick={goToSignIn}>Go to sign in page</span>
            <span onClick={goToSignUp}>Go to sign up page</span>
        </div>
    )
}

export default FormNavbar