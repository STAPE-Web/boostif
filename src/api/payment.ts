import axios from "axios";

class API {
    async pay(price: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/payment`, {
            price
        }).then((res) => res.data)
    }
}

export default new API()