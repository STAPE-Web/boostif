export default interface State {
    headerShown: boolean;
    page: string

    changeHeaderShown: (value: boolean) => void
    changePage: (value: string) => void
}