import axios from 'axios'

const baseUrl = 'http://localhost:4000/api'

const api = axios.create({
    withCredentials: true,
    baseURL: baseUrl
})

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
})

api.interceptors.response.use(config => config, async error => {
    try {
        const originalReq = error.config
        if (error.response.status === 401 && error.config && !originalReq.isRetry) {
            originalReq.isRetry = true
            const response = await axios.get(`${baseUrl}/refresh-tokens`, {withCredentials: true})
            const {accessToken} = response.data
            localStorage.setItem('token', accessToken)
            return api.request(originalReq)
        }
    } catch (e) {
        console.log(e)
        throw e
    }
})

export default api