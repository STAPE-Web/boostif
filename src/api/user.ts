import axios from "axios";

class API {
    async update(username: string, userId: string | null) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/user/update`, {
            userId: userId,
            username: username,
        }).then(res => res.data)
    }

    async get(id: string) {
        return await axios.get(`${import.meta.env.VITE_SERVER}/user/get`, {
            params: {
                uid: id
            }
        }).then((res) => res.data)
    }

    async delete(userId: string | null) {
        return await axios.delete(`${import.meta.env.VITE_SERVER}/user/delete`, {
            params: {
                uid: userId
            }
        }).then(res => res.data)
    }
}

export default new API()