import { IAdditional } from "@/types";
import axios from "axios";

class API {
    async get(gameId: string) {
        return await axios.get(`${import.meta.env.VITE_SERVER}/items`, {
            params: {
                gameId
            }
        }).then((res) => res.data)
    }

    async getOne(serviceId: string) {
        return await axios.get(`${import.meta.env.VITE_SERVER}/items/get`, {
            params: {
                serviceId
            }
        }).then((res) => res.data)
    }

    async create(title: string, price: string, description: string, details: string[], requirements: string[], activePage: string, imagePath: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/items/create`, {
            name: title,
            price, details, description, requirements,
            game: activePage,
            image: imagePath
        }).then((res) => res.data)
    }

    async delete(id: string) {
        return await axios.delete(`${import.meta.env.VITE_SERVER}/items/delete`, {
            params: {
                id
            }
        }).then((res) => res.data)
    }

    async update(id: string, title: string, price: string, description: string, imagePath: string, additionalData: IAdditional) {
        return await axios.put(`${import.meta.env.VITE_SERVER}/items/update`, {
            id,
            name: title,
            price, description,
            image: imagePath,
            additionalData
        }).then((res) => res.data)
    }
}

export default new API()