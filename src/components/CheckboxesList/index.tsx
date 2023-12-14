import Checkbox from "@/ui/Checkbox"
import { FC } from "react"
import styles from './style.module.css'
import { IArray } from "@/store/types/admin"

interface Props {
    array: IArray[]
    setValue: React.Dispatch<React.SetStateAction<IArray[]>>
    value: IArray[]
}

const CheckboxesList: FC<Props> = ({ array, setValue, value }) => {
    function selectItem(arr: IArray) {
        if (value.includes(arr)) {
            const filteredArr = value.filter(i => i.name !== arr.name)
            setValue(filteredArr)
        } else {
            setValue(prev => [...prev, arr])
        }
    }

    return (
        <div className={styles.List}>
            {array.map((arr, index) => (
                <div className={styles.Item} key={index} onClick={() => selectItem(arr)}>
                    <Checkbox active={value.includes(arr)} />
                    {arr.name}
                </div>
            ))}
        </div>
    )
}

export default CheckboxesList