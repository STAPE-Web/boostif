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

export type IGame = {
    id: string,
    data: {
        image: string
        name: string
        text: string
    }
}

export type IService = {
    id: string,
    data: {
        image: string
        name: string
        backgroundImage: string
        game: string
        details: string[]
        requirements: string[]
        price: string
        description: string
    }
}