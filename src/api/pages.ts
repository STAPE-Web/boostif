import axios from "axios";

class API {
    async getOne(id: string) {
        return await axios.get(`${import.meta.env.VITE_SERVER}/pages/get`, {
            params: {
                id
            }
        }).then((res) => res.data)
    }

    async update(id: string, html: string) {
        return await axios.put(`${import.meta.env.VITE_SERVER}/pages/update`, {
            id, html
        }).then((res) => res.data)
    }
}

export default new API()