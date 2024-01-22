export default interface State {
    headerShown: boolean;
    page: string
    modal: boolean

    changeHeaderShown: (value: boolean) => void
    changePage: (value: string) => void
    changeModal: (value: boolean) => void
}