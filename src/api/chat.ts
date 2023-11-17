import { IMessage } from "@/types";
import axios from "axios";

class API {
    async get(session: string) {
        return await axios.get(`${import.meta.env.VITE_SERVER}/chat/get`, {
            params: {
                session: session
            }
        }).then((res) => res.data)
    }

    async message(session: string, messageData: IMessage) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/chat/message`, {
            session, messageData
        }).then(res => res.data)
    }
}

export default new API()