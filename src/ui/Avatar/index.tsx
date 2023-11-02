import { FC } from 'react'
import styles from "./style.module.css"

interface Props {
    large?: boolean
    url?: string
    sign?: string
    onClick?: () => void
}

const Avatar: FC<Props> = ({ url, sign, large, onClick }) => {
    return (
        <div className={`${styles.Avatar} ${large && styles.Large}`} onClick={onClick}>
            {url !== undefined
                ? <img src={url} alt='' />
                : <p>{sign}</p>
            }
        </div>
    )
}

export default Avatar