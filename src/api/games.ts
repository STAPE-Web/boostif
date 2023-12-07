import axios from "axios";

class API {
    async get() {
        return await axios.get(`${import.meta.env.VITE_SERVER}/games`).then((res) => res.data)
    }
}

export default new API()