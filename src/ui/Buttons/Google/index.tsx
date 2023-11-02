import { FC } from 'react'
import styles from './style.module.css'
import GoogleLogo from '@/assets/GoogleLogo';

interface Props {
    onClick: () => void;
}

const Button: FC<Props> = ({ onClick }) => {
    return (
        <button className={styles.Button} onClick={onClick}>
            <GoogleLogo />
            Continue with Google
        </button>
    )
}

export default Button