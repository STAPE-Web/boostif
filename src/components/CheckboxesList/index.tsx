import Checkbox from "@/ui/Checkbox"
import { FC } from "react"
import styles from './style.module.css'

interface Props {
    array: string[]
    setValue: React.Dispatch<React.SetStateAction<string[]>>
    value: string[]
}

const CheckboxesList: FC<Props> = ({ array, setValue, value }) => {
    function selectItem(arr: string) {
        if (value.includes(arr)) {
            const filteredArr = value.filter(i => i !== arr)
            setValue(filteredArr)
        } else {
            setValue(prev => [...prev, arr])
        }
    }

    return (
        <div className={styles.List}>
            {array.map(arr => (
                <div className={styles.Item} key={array.indexOf(arr)} onClick={() => selectItem(arr)}>
                    <Checkbox active={value.includes(arr)} />
                    {arr}
                </div>
            ))}
        </div>
    )
}

export default CheckboxesList