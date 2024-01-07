import { AddIcon, DeleteIcon } from "@/ui/Icons"
import { ChangeEvent, FC } from "react"
import styles from "../style.module.css"
import Input from "@/ui/Input"
import useAdminStore from "@/store/admin"

interface Props {
    tab: string
    handleDetails: (e: ChangeEvent<HTMLInputElement>, index: number) => void
}

const Details: FC<Props> = ({ tab, handleDetails }) => {
    const details = useAdminStore(state => state.data.details)
    const changeDetails = useAdminStore(state => state.changeDetails)

    return (
        <>
            <h2>{tab}</h2>
            {details.map((item, index) => (
                <div key={index} className={styles.Row2}>
                    <Input key={index} label="" onChange={e => handleDetails(e, index)} placeholder="Detail Name" type="text" value={item} />
                    <DeleteIcon className={styles.DeleteIcon} onClick={() => changeDetails(details.filter((_, id) => id !== index))} />
                </div>
            ))}
            <button className={styles.ButtonUpdate} onClick={() => changeDetails([...details, ""])}>
                <AddIcon />
            </button>
        </>
    )
}

export default Details