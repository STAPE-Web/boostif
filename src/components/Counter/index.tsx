import { MinusIcon, PlusIcon } from "@/ui/Icons"
import { FC } from "react"
import styles from "./style.module.css"

interface Props {
    count: number
    setCount: React.Dispatch<React.SetStateAction<number>>
}

const Counter: FC<Props> = ({ count, setCount }) => {
    return (
        <div className={styles.Counter}>
            <MinusIcon onClick={() => setCount(count - 1)} />
            <p>{count}</p>
            <PlusIcon onClick={() => setCount(count + 1)} />
        </div>
    )
}

export default Counter