import { FC } from "react"
import styles from './style.module.css'
import { CheckIcon } from "../Icons"

interface Props {
    active: boolean
}

const Checkbox: FC<Props> = ({ active }) => {
    return (
        <div className={styles.Checkbox}>
            <CheckIcon className={`${styles.Icon} ${active ? styles.Active : ''}`} />
        </div>
    )
}

export default Checkbox