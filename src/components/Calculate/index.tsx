import Input from "@/ui/Input"
import Range from "@/ui/Range"
import { FC, useEffect } from "react"
import styles from './style.module.css'

interface Props {
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
}

const Calculate: FC<Props> = ({ setValue, value }) => {
    useEffect(() => {
        if (value >= 15) setValue(15)
        if (value <= 1) setValue(1)
    }, [value])

    return (
        <div className={styles.Calculate}>
            <Input max={15} min={1} label="Run(s)" value={value} onChange={e => setValue(Number(e.target.value))} placeholder="Enter Runs" type="number" />
            <Range value={value} setValue={setValue} />
        </div>
    )
}

export default Calculate