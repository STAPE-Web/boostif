import { FC } from "react"
import styles from './style.module.css'

interface Props {
    type: string;
    placeholder: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label: string,
    min?: number
    max?: number
}

const Input: FC<Props> = ({ onChange, placeholder, type, value, label, max, min }) => {
    return (
        <div className={styles.Input}>
            <label>{label}</label>
            <input value={value} onChange={onChange} placeholder={placeholder} max={max} min={min} type={type} />
        </div>
    )
}

export default Input