import { ChangeEvent, FC } from "react"
import styles from "../style.module.css"
import Input from "@/ui/Input"
import useAdminStore from "@/store/admin"
import Toggle from "@/components/Toggle"
import { AddIcon, DeleteIcon } from "@/ui/Icons"

interface Props {
    tab: string
    difficultyHidden: boolean
    setHiddenDifficulty: React.Dispatch<React.SetStateAction<boolean>>
    setTitleDifficulty: React.Dispatch<React.SetStateAction<string>>
    difficultyTitle: string
    handleDifficulty: (e: ChangeEvent<HTMLInputElement>, index: number, state: string) => void
}

const Difficulty: FC<Props> = ({ tab, difficultyHidden, difficultyTitle, handleDifficulty, setHiddenDifficulty, setTitleDifficulty }) => {
    const difficulty = useAdminStore(state => state.data.difficulty)
    const changeDifficulty = useAdminStore(state => state.changeDifficulty)

    return (
        <>
            <div className={styles.Row2}>
                <h2>{tab}</h2>
                <Toggle state={difficultyHidden} onChange={() => setHiddenDifficulty(!difficultyHidden)} />
            </div>

            <Input label="" onChange={e => setTitleDifficulty(e.target.value)} placeholder={"Difficulty Title"} type="text" value={difficultyTitle} />

            {difficulty.array.map((item, index) => (
                <div className={styles.Row} key={index}>
                    <Input label="" onChange={e => handleDifficulty(e, index, "name")} placeholder={"Difficulty Name"} type="text" value={item.name} />
                    <Input label="" onChange={e => handleDifficulty(e, index, "price")} placeholder="Price" type="number" value={item.price} />
                    <DeleteIcon className={styles.DeleteIcon} onClick={() => changeDifficulty({
                        hidden: difficulty.hidden, title: difficulty.title,
                        array: difficulty.array.filter((_, id) => id !== index)
                    })} />
                </div>
            ))}
            <button className={styles.ButtonUpdate} onClick={() => changeDifficulty({
                hidden: difficulty.hidden, title: difficulty.title,
                array: [...difficulty.array, { name: "", price: 0 }]
            })}>
                <AddIcon />
            </button>
        </>
    )
}

export default Difficulty