import React, { FC, useState } from "react"
import styles from './style.module.css'
import { ArrowDownIcon, DeleteIcon } from "@/ui/Icons"

interface Props {
    array: string[]
    deleteSection: (name: string) => Promise<void>
}

const SelectSections: FC<Props> = ({ array, deleteSection }) => {
    const [active, setActive] = useState(false)
    const [activeItem, setActiveItem] = useState<number | null>(null)

    return (
        <div className={`${styles.Module} ${active ? styles.Active : ''}`}>
            <div className={styles.Select} onClick={() => setActive(!active)}>
                <p>{`${array[0]} ${array.length > 1 ? `+ ${array.length - 1}` : ""}`}</p>
                <ArrowDownIcon className={styles.Icon} />
            </div>

            {active && <div className={styles.DropDown}>
                {array.map((item, index) => (
                    <React.Fragment key={index}>
                        <div
                            className={styles.Item}
                            onMouseEnter={() => setActiveItem(index)}
                            onMouseLeave={() => setActiveItem(index)}
                        >
                            {item}

                            {activeItem === index && <DeleteIcon className={styles.DeleteIcon} onClick={() => {
                                deleteSection(item)
                                setActive(false)
                            }} />}
                        </div>
                    </React.Fragment>
                ))}
            </div>}
        </div>
    )
}

export default SelectSections