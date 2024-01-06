export type IArray = {
    name: string
    price: number,
    hidden?: boolean
}

export type IArray2 = {
    name: string
    price: number[],
}

export type IPlatform_Service = {
    title: string
    hidden: boolean
    array: IArray[]
}

export type IService = {
    title: string
    hidden: boolean
    array: IArray2[]
}

export type IRuns = {
    title: string
    count: number,
    label: string
    price: number
}

export type ILevel = {
    hidden: boolean,
    title: string
    count: number,
    label: string[],
    price: number
}

export default interface State {
    activePage: string;
    modal: boolean,
    data: {
        hideCalculator: boolean,
        details: string[]
        requirements: string[],
        platform: IPlatform_Service
        service: IService
        runs: IRuns,
        difficulty: IPlatform_Service
        level: ILevel
    }

    changeActivePage: (value: string) => void
    changeModal: (value: boolean) => void
    // Change Data
    changeDetails: (value: string[]) => void
    changeRequirements: (value: string[]) => void
    changePlatform: (value: IPlatform_Service) => void
    changeService: (value: IService) => void
    changeRuns: (value: IRuns) => void
    changeDifficulty: (value: IPlatform_Service) => void
    changeCalculator: (value: boolean) => void
    changeLevel: (value: ILevel) => void
}