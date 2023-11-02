import { FC } from "react"
import styles from './style.module.css'

interface Props {
    children: any
    onClick: () => void
    red?: boolean
}

const Button: FC<Props> = ({ children, onClick, red }) => {
    return (
        <button onClick={onClick} className={`${styles.Button} ${red ? styles.Red : ''}`}>{children}</button>
    )
}

export default Button