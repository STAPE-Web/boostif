import { ChangeEvent, FC } from "react"
import styles from "../style.module.css"
import Input from "@/ui/Input"
import useAdminStore from "@/store/admin"
import Toggle from "@/components/Toggle"

interface Props {
    tab: string
    calculatorHidden: boolean
    setCalculatorHidden: React.Dispatch<React.SetStateAction<boolean>>
    handleRuns: (e: ChangeEvent<HTMLInputElement>, state: string) => void
}

const Runs: FC<Props> = ({ calculatorHidden, handleRuns, setCalculatorHidden, tab }) => {
    const runs = useAdminStore(state => state.data.runs)

    return (
        <>
            <div className={styles.Row2}>
                <h2>{tab}</h2>
                <Toggle state={calculatorHidden} onChange={() => setCalculatorHidden(!calculatorHidden)} />
            </div>
            <Input label="" onChange={e => handleRuns(e, "title")} placeholder={"Runs Title"} type="text" value={runs.title} />
            <Input label="" onChange={e => handleRuns(e, "label")} placeholder={"Runs Label"} type="text" value={runs.label} />
            <Input label="Runs Max Count" onChange={e => handleRuns(e, "count")} placeholder={""} type="number" value={runs.count} />
            <Input label="1 Run Price" onChange={e => handleRuns(e, "price")} placeholder={""} type="number" value={runs.price} />
        </>
    )
}

export default Runs