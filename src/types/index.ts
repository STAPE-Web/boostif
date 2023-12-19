import { IPlatform_Service, IRuns } from "@/store/types/admin"
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

type IArray = {
    name: string
    price: number
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
        platform: {
            title: string
            hidden: boolean
            array: IArray[]
        }
        service: {
            title: string
            hidden: boolean
            array: IArray[]
        }
        runs: {
            title: string
            count: number,
            label: string
        },
        hideCalculator: boolean,
        difficulty: {
            title: string
            hidden: boolean
            array: IArray[]
        }
    }
}

export type IAdditional = {
    hideCalculator: boolean,
    details: string[]
    requirements: string[],
    platform: IPlatform_Service
    service: IPlatform_Service
    runs: IRuns
}