import axios from "axios";

class API {
    async login(email: string, password: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/login`, {
            email: email,
            password: password
        }).then(res => res.data)
    }

    async register(email: string, password: string, username: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/register`, {
            email: email,
            password: password,
            username: username
        }).then(res => res.data)
    }

    async oauth() {
        return await axios.post(`${import.meta.env.VITE_SERVER}/google`).then(res => res.data)

    }
}

export default new API()