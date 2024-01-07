import { ChangeEvent, FC } from "react"
import styles from "../style.module.css"
import Input from "@/ui/Input"
import useAdminStore from "@/store/admin"
import Toggle from "@/components/Toggle"

interface Props {
    tab: string
    platformHidden: boolean
    setHiddenPlatform: React.Dispatch<React.SetStateAction<boolean>>
    setTitlePlatform: React.Dispatch<React.SetStateAction<string>>
    platformTitle: string
    handlePlatform: (e: ChangeEvent<HTMLInputElement>, index: number, state: string) => void
}

const Platform: FC<Props> = ({ tab, platformHidden, setHiddenPlatform, platformTitle, setTitlePlatform, handlePlatform }) => {
    const platform = useAdminStore(state => state.data.platform)

    return (
        <>
            <div className={styles.Row2}>
                <h2>{tab}</h2>
                <Toggle state={platformHidden} onChange={() => setHiddenPlatform(!platformHidden)} />
            </div>

            <Input label="" onChange={e => setTitlePlatform(e.target.value)} placeholder={"Platform Title"} type="text" value={platformTitle} />

            {platform.array.map((item, index) => (
                <div className={styles.Row} key={index}>
                    <Input label="" onChange={() => ({})} placeholder={item.name} type="text" value={item.name} />
                    <Input label="" onChange={e => handlePlatform(e, index, "price")} placeholder="Price" type="number" value={item.price} />
                    <Toggle state={item.hidden} onChange={(e: any) => handlePlatform(e, index, "hidden")} />
                </div>
            ))}
        </>
    )
}

export default Platform