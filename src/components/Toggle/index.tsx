import { FC } from 'react'
import style from './style.module.css'

interface Props {
    state: boolean | undefined
    onChange: (e: any) => void
}

const Toggle: FC<Props> = ({ state, onChange }) => {
    return (
        <div className={`${style.Box} ${state ? style.Active : ""}`} onClick={onChange}>
            <div className={style.Toggle}></div>
        </div>
    )
}

export default Toggle