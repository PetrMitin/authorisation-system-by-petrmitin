import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signOut } from "../utils/authorisationService"
import { getRegistrationDate } from "../utils/userService"
import './infoPage.css'

const InfoPage = () => {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.userId)
    const [registrationDate, setRegistrationDate] = useState(null)

    const handleGetRegistrationDate = async (e) => {
        e.preventDefault()
        setRegistrationDate(await getRegistrationDate(dispatch))
    }

    const handleSignOut = (e) => {
        e.preventDefault()
        signOut(dispatch)
    }

    return (
        <div className='info-page'>
            <h1>Oppa, ID{userId} pod'exal</h1>
            {registrationDate && <h2>{registrationDate}</h2>}
            <button onClick={handleGetRegistrationDate}>Get your registration date</button><br/>
            <button onClick={handleSignOut} className='sign-out-button'>Sign Out</button>
        </div>
    )
}

export default InfoPage