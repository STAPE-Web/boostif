import Button from "@/ui/Buttons/Default"
import Select from "@/ui/Select"
import { useState, useEffect, useCallback } from "react"
import styles from './style.module.css'
import CheckboxesList from "@/components/CheckboxesList"
import Calculate from "@/components/Calculate"

const Order = () => {
    const [value, setValue] = useState('')
    const [check, setCheck] = useState<string[]>([])
    const [runs, setRuns] = useState(1)
    const [price, setPrice] = useState(5.99)

    const selectArray = ["M+10", "M+11", "M+12", "M+13", "M+14", "M+15", "M+16", "M+17", "M+18", "M+19", "M+20"]
    const checkboxArray = ["Guaranteed timer (+1 extra item from the chest)", "Specific dungeon", "Priority start", "Premium group (2 loot traders) - FREE", "VIP group (3 loot traders)"]

    const calculateWithKeyLevel = useCallback(() => {
        let resPrice = 5.99

        switch (value) {
            case "M+10":
                resPrice = 5.99
                break;
            case "M+11":
                resPrice = 6.99
                break;
            case "M+12":
                resPrice = 9.99
                break;
            case "M+13":
                resPrice = 11.99
                break;
            case "M+14":
                resPrice = 12.99
                break;
            case "M+15":
                resPrice = 14.99
                break;
            case "M+16":
                resPrice = 19.99
                break;
            case "M+17":
                resPrice = 29.99
                break;
            case "M+18":
                resPrice = 32.99
                break;
            case "M+19":
                resPrice = 34.99
                break;
            case "M+20":
                resPrice = 39.99
                break;
        }
        setPrice(resPrice)
    }, [value, check, runs])

    const calculate = useCallback(() => {
        let calculatedPrice = price;

        check.forEach(c => {
            switch (c) {
                case "Guaranteed timer (+1 extra item from the chest)":
                    calculatedPrice += calculatedPrice * 0.3;
                    break;
                case "Specific dungeon":
                    calculatedPrice += calculatedPrice * 0.3;
                    break;
                case "Priority start":
                    calculatedPrice += calculatedPrice * 0.3;
                    break;
                case "Premium group (2 loot traders) - FREE":
                    calculatedPrice += calculatedPrice * 0.3;
                    break;
                case "VIP group (3 loot traders)":
                    calculatedPrice += calculatedPrice * 0.3;
                    break;
            }
        });
        setPrice(calculatedPrice);
    }, [check, value, runs])


    useEffect(() => {
        calculateWithKeyLevel()
        calculate()
    }, [calculateWithKeyLevel, calculate])

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
                <h2>$ {price.toFixed(2)}</h2>
                <Button onClick={() => ({})}>Buy Now</Button>
            </div>
        </section>
    )
}

export default Order