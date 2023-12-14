export type IArray = {
    name: string
    price: number,
    hidden?: boolean
}

export type IPlatform_Service = {
    title: string
    hidden: boolean
    array: IArray[]
}

export type IRuns = {
    title: string
    count: number
}

export default interface State {
    activePage: string;
    modal: boolean,
    data: {
        hideCalculator: boolean,
        details: string[]
        requirements: string[],
        platform: IPlatform_Service
        service: IPlatform_Service
        runs: IRuns
    }

    changeActivePage: (value: string) => void
    changeModal: (value: boolean) => void
    // Change Data
    changeDetails: (value: string[]) => void
    changeRequirements: (value: string[]) => void
    changePlatform: (value: IPlatform_Service) => void
    changeService: (value: IPlatform_Service) => void
    changeRuns: (value: IRuns) => void
    changeCalculator: (value: boolean) => void
}