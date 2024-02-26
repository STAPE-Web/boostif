import { FC, useState } from "react"
import styles from "./style.module.css"
import { MinusIcon, PlusIcon } from "../Icons"

type IArray = {
    text: string
    title: string
}

interface Props {
    array: IArray
}

const FaqItem: FC<Props> = ({ array }) => {
    const [active, setActive] = useState(false)

    return (
        <div className={styles.Item} onClick={() => setActive(!active)}>
            <div className={styles.Box}>
                <h3>{array.title}</h3>
                <div>
                    {active
                        ? <MinusIcon />
                        : <PlusIcon />

                    }
                </div>
            </div>

            <p className={active ? styles.Active : ""}>{array.text}</p>
        </div>
    )
}

export default FaqItem