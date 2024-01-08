import axios from "axios";

class API {
    async get() {
        return await axios.get(`${import.meta.env.VITE_SERVER}/games`).then((res) => res.data)
    }

    async getOne(id: string) {
        return await axios.get(`${import.meta.env.VITE_SERVER}/games/get`, {
            params: {
                id
            }
        }).then((res) => res.data)
    }

    async update(id: string, data: any) {
        return await axios.put(`${import.meta.env.VITE_SERVER}/games/update`, {
            id, data
        }).then((res) => res.data)
    }
}

export default new API()