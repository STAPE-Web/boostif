import { AxiosResponse } from "axios"

export type IItem = {
    id: number
    title: string,
    image: string,
    description: string
}

export type IStep = {
    id: number
    title: string,
    description: string
}

export type IUser = {
    id: string;
    data: {
        authType?: string;
        avatar?: string;
        dateCreate: any;
        email: string;
        username: string;
    }
}

export type ApiResponse<T> = AxiosResponse<{
    data: T
}>

export type IMessage = {
    content: string
    sender: string
}

export type IMessageRes = {
    timestamp: string
    session: string
    messageData: IMessage

}