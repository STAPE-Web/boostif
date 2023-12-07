import Button from "@/ui/Buttons/Default"
import { useState, useEffect, FC } from "react"
import styles from './style.module.css'
import CheckboxesList from "@/components/CheckboxesList"
import Calculate from "@/components/Calculate"
import { IService } from "@/types"

interface Props {
    data: IService | null
}

const Order: FC<Props> = ({ data }) => {
    const [check, setCheck] = useState<string[]>([])
    const [runs, setRuns] = useState(1)
    const [price, setPrice] = useState(0)

    const checkboxArray = ["Guaranteed timer (+1 extra item from the chest)", "Specific dungeon", "Priority start", "Premium group (2 loot traders) - FREE", "VIP group (3 loot traders)"]

    useEffect(() => {
        if (data !== undefined) {
            setPrice((Number(data?.data.price) + (check.length * 2)) * runs || 0)
        }
    }, [check, runs, data])


    return (
        <section className={styles.Order}>
            <div className={styles.Top}>
                {/* <h3>Choose key level</h3> */}
                {/* <Select array={selectArray} setValue={setValue} value={value} /> */}

                <h3>Customize your boost</h3>
                <CheckboxesList array={checkboxArray} setValue={setCheck} value={check} />

                <h3>Add more runs</h3>
                <Calculate value={runs} setValue={setRuns} />
            </div>

            <div className={styles.Bottom}>
                <h2>$ {price.toFixed(2)}</h2>
                <Button onClick={() => ({})}>Buy Now</Button>
            </div>
        </section>
    )
}

export default Order