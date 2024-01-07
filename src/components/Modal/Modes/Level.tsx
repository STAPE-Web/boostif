import { ChangeEvent, FC } from "react"
import styles from "../style.module.css"
import Input from "@/ui/Input"
import useAdminStore from "@/store/admin"
import Toggle from "@/components/Toggle"

interface Props {
    tab: string
    levelHidden: boolean
    setHiddenLevel: React.Dispatch<React.SetStateAction<boolean>>
    handleLevel: (e: ChangeEvent<HTMLInputElement>, state: string, index?: number | undefined) => void
}

const Level: FC<Props> = ({ tab, handleLevel, levelHidden, setHiddenLevel }) => {
    const level = useAdminStore(state => state.data.level)

    return (
        <>
            <div className={styles.Row2}>
                <h2>{tab}</h2>
                <Toggle state={levelHidden} onChange={() => setHiddenLevel(!levelHidden)} />
            </div>
            <Input label="" onChange={e => handleLevel(e, "title")} placeholder={"Level Title"} type="text" value={level.title} />
            <div className={styles.Row}>
                <Input label="" onChange={e => handleLevel(e, "label", 0)} placeholder={"Level Label"} type="text" value={level.label[0]} />
                <Input label="" onChange={e => handleLevel(e, "label", 1)} placeholder={"Level Label"} type="text" value={level.label[1]} />
            </div>
            <Input label="Level Max Count" onChange={e => handleLevel(e, "count")} placeholder={""} type="number" value={level.count} />
            <Input label="Level Price" onChange={e => handleLevel(e, "price")} placeholder={""} type="number" value={level.price} />
        </>
    )
}

export default Level