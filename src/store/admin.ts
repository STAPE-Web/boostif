import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import State, { IPlatform_Service, IRuns, IService } from './types/admin'

const useAdminStore = create<State>()(devtools((set) => ({
    activePage: "1",
    modal: false,
    data: {
        hideCalculator: false,
        details: [],
        requirements: [],
        platform: {
            title: "",
            hidden: false,
            array: [
                { name: "PC", price: 0, hidden: false },
                { name: "Xbox", price: 0, hidden: false },
                { name: "PS", price: 0, hidden: false }
            ]
        },
        service: {
            title: "",
            hidden: false,
            array: [
                { name: "", price: [0, 0, 0] }
            ]
        },
        runs: {
            title: "",
            count: 0,
            label: ""
        },
        difficulty: {
            title: "",
            hidden: false,
            array: [
                { name: "", price: 0 },
            ]
        }
    },

    changeActivePage: (value: string) => set({ activePage: value }),
    changeModal: (value: boolean) => set({ modal: value }),
    // Change Data
    changeDetails: (value: string[]) => set((state) => ({ data: { ...state.data, details: value } })),
    changeRequirements: (value: string[]) => set((state) => ({ data: { ...state.data, requirements: value } })),
    changePlatform: (value: IPlatform_Service) => set((state) => ({ data: { ...state.data, platform: value } })),
    changeService: (value: IService) => set((state) => ({ data: { ...state.data, service: value } })),
    changeRuns: (value: IRuns) => set((state) => ({ data: { ...state.data, runs: value } })),
    changeDifficulty: (value: IPlatform_Service) => set((state) => ({ data: { ...state.data, difficulty: value } })),
    changeCalculator: (value: boolean) => set((state) => ({ data: { ...state.data, hideCalculator: value } })),
})))

export default useAdminStore