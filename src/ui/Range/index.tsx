import { FC } from 'react'
import styles from './style.module.css'

interface Props {
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
}

const Range: FC<Props> = ({ value, setValue }) => {
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        let target = e.target
        const min = Number(target.min)
        const max = Number(target.max)
        const val = Number(target.value)

        setValue(val)

        target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
    }

    return (
        <div className={styles.Range}>
            <input type="range" min={1} max={15} value={value} onChange={e => handleInputChange(e)} />

            <div className={styles.Values}>
                <div>1</div>
                <div>15</div>
            </div>
        </div>
    )
}

export default Range