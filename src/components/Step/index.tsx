import { IStep } from "@/types"
import { FC } from "react"
import styles from './style.module.css'

interface Props {
    step: IStep
}

const Step: FC<Props> = ({ step }) => {
    return (
        <div className={styles.Step}>
            <h4>{`0${step.id}`}</h4>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
        </div>
    )
}

export default Step