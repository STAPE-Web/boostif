import { FC } from "react"
import styles from './style.module.css'

interface Props {
    children: any
    onClick: () => void
}

const Button: FC<Props> = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className={styles.Button}>{children}</button>
    )
}

export default Button