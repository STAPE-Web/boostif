import Button from "@/ui/Buttons/Default"
import Select from "@/ui/Select"
import { useState } from "react"
import styles from './style.module.css'
import CheckboxesList from "@/components/CheckboxesList"
import Calculate from "@/components/Calculate"

const Order = () => {
    const [value, setValue] = useState('')
    const [check, setCheck] = useState<string[]>([])
    const [runs, setRuns] = useState(1)

    const selectArray = ["M+15", "M+16", "M+17", "M+18", "M+19", "M+20", "M+21", "M+22", "M+23", "M+24", "M+25", "M+26", "M+27", "M+28", "M+29"]
    const checkboxArray = ["Guaranteed timer (+1 extra item from the chest)", "Specific dungeon", "Priority start", "Premium group (2 loot traders) - FREE", "VIP group (3 loot traders)"]

    return (
        <section className={styles.Order}>
            <div className={styles.Top}>
                <h3>Choose key level</h3>
                <Select array={selectArray} setValue={setValue} value={value} />

                <h3>Customize your boost</h3>
                <CheckboxesList array={checkboxArray} setValue={setCheck} value={check} />

                <h3>Add more runs</h3>
                <Calculate value={runs} setValue={setRuns} />
            </div>

            <div className={styles.Bottom}>
                <h2>$ 7.99</h2>
                <Button onClick={() => ({})}>Buy Now</Button>
            </div>
        </section>
    )
}

export default Order