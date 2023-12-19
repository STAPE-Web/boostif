import React, { Dispatch, FC, SetStateAction, useState } from "react"
import styles from './style.module.css'
import { ArrowDownIcon, CheckIcon } from "@/ui/Icons"
import { IArray } from "@/store/types/admin"

interface Props {
    array: IArray[]
    setValue: Dispatch<SetStateAction<IArray | null>>
    value: IArray | null
}

const Select: FC<Props> = ({ array, setValue, value }) => {
    const [active, setActive] = useState(false)

    function selectItem(item: IArray) {
        setValue(item)
        setActive(false)
    }

    return (
        <div className={`${styles.Module} ${active ? styles.Active : ''}`}>
            <div className={styles.Select} onClick={() => setActive(!active)}>
                <p>{value?.name || 'Nothing selected'}</p>
                <ArrowDownIcon className={styles.Icon} />
            </div>

            {active && <div className={styles.DropDown}>
                {array.map((item, index) => (
                    <React.Fragment key={index}>
                        <div
                            className={styles.Item}
                            style={{ display: item.hidden === undefined ? "flex" : item.hidden ? "flex" : "none" }}
                            onClick={() => selectItem(item)}
                        >
                            {item.name}

                            <div className={`${styles.Checked} ${item === value ? styles.Active : ''}`}>
                                <CheckIcon className={styles.CheckIcon} />
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>}
        </div>
    )
}

export default Select