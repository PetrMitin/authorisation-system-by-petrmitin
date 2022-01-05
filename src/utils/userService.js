import { signOut } from "./authorisationService"
import api from "./axiosInstance"

const getRegistrationDate = async dispatch => {
    try {
        const response = await api.get('/registration-date')
        const registrationDate = response.data.registrationDate
        return registrationDate
    } catch(e) {
        console.log(e)
        signOut(dispatch)
    }
}  

export { getRegistrationDate }