import { FC, useState } from "react"
import styles from './style.module.css'
import { ArrowDownIcon, CheckIcon } from "@/ui/Icons"

interface Props {
    array: string[]
    setValue: React.Dispatch<React.SetStateAction<string>>
    value: string
}

const Select: FC<Props> = ({ array, setValue, value }) => {
    const [active, setActive] = useState(false)

    function selectItem(item: string) {
        setValue(item)
        setActive(false)
    }

    return (
        <div className={`${styles.Module} ${active ? styles.Active : ''}`}>
            <div className={styles.Select} onClick={() => setActive(!active)}>
                <p>{value || 'Nothing selected'}</p>
                <ArrowDownIcon className={styles.Icon} />
            </div>

            {active && <div className={styles.DropDown}>
                {array.map(item => (
                    <div
                        key={item.toString()}
                        className={styles.Item}
                        onClick={() => selectItem(item)}
                    >
                        {item}

                        <div className={`${styles.Checked} ${item === value ? styles.Active : ''}`}>
                            <CheckIcon className={styles.CheckIcon} />
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default Select