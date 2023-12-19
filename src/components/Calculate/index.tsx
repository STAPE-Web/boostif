import Input from "@/ui/Input"
import Range from "@/ui/Range"
import { FC, useEffect } from "react"
import styles from './style.module.css'

interface Props {
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
    maxCount: number,
    label: string
}

const Calculate: FC<Props> = ({ setValue, value, maxCount, label }) => {
    useEffect(() => {
        if (value >= maxCount) setValue(maxCount)
        if (value <= 1) setValue(1)
    }, [value])

    return (
        <div className={styles.Calculate}>
            <Input max={maxCount} min={1} label={label} value={value} onChange={e => setValue(Number(e.target.value))} placeholder="Enter Runs" type="number" />
            <Range maxCount={maxCount} value={value} setValue={setValue} />
        </div>
    )
}

export default Calculate