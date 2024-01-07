import { ChangeEvent, FC } from "react"
import { AddIcon, DeleteIcon } from "@/ui/Icons"
import styles from "../style.module.css"
import Input from "@/ui/Input"
import useAdminStore from "@/store/admin"

interface Props {
    tab: string
    handleRequirements: (e: ChangeEvent<HTMLInputElement>, index: number) => void
}

const Requirements: FC<Props> = ({ tab, handleRequirements }) => {
    const requirements = useAdminStore(state => state.data.requirements)
    const changeRequirements = useAdminStore(state => state.changeRequirements)

    return (
        <>
            <h2>{tab}</h2>
            {requirements.map((item, index) => (
                <div key={index} className={styles.Row2}>
                    <Input label="" onChange={e => handleRequirements(e, index)} placeholder="Requirement Name" type="text" value={item} />
                    <DeleteIcon className={styles.DeleteIcon} onClick={() => changeRequirements(requirements.filter((_, id) => id !== index))} />
                </div>
            ))}
            <button className={styles.ButtonUpdate} onClick={() => changeRequirements([...requirements, ""])}>
                <AddIcon />
            </button>
        </>
    )
}

export default Requirements