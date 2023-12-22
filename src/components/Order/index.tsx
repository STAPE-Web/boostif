import Button from "@/ui/Buttons/Default"
import { useState, useEffect, FC } from "react"
import styles from './style.module.css'
import CheckboxesList from "@/components/CheckboxesList"
import Calculate from "@/components/Calculate"
import { IService } from "@/types"
import Select from "@/ui/Select"
import { IArray } from "@/store/types/admin"

interface Props {
    data: IService | null
}

const Order: FC<Props> = ({ data }) => {
    const [value, setValue] = useState<IArray | null>(null)
    const [difficulty, setDifficulty] = useState<IArray | null>(null)
    const [check, setCheck] = useState<IArray[]>([])
    const [runs, setRuns] = useState(1)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        if (data !== undefined) {
            setPrice((Number(data?.data.price) + (check.reduce((acc, number) => acc + number.price, 0)) + (value?.price || 0) + (difficulty?.price || 0)) * runs || 0)
        }
    }, [check, runs, data, value, difficulty])

    return (
        <section className={styles.Order}>
            <div className={styles.Top}>
                {data?.data.platform !== undefined ? data.data.platform.hidden && <>
                    {data?.data.platform.title !== undefined && <h3>{data?.data.platform.title}</h3>}
                    {data?.data.platform.array !== undefined && <Select array={data?.data.platform.array} setValue={setValue} value={value} />}
                </>
                    : <>
                        <h3>Platform</h3>
                        <Select array={[{ name: "PC", price: 1, hidden: true }, { name: "Xbox", price: 1, hidden: true }]} setValue={setValue} value={value} />
                    </>
                }

                {data?.data.difficulty !== undefined ? data.data.difficulty.hidden && <>
                    {data?.data.difficulty.title !== undefined && <h3>{data?.data.difficulty.title}</h3>}
                    {data?.data.difficulty.array !== undefined && <Select array={data?.data.difficulty.array} setValue={setDifficulty} value={difficulty} />}
                </>
                    : <>
                        <h3>Difficulty</h3>
                        <Select array={[{ name: "Difficult #1", price: 1 }, { name: "Difficult #2", price: 1 }]} setValue={setDifficulty} value={difficulty} />
                    </>
                }

                {data?.data.service !== undefined ? data.data.service.hidden && <>
                    {data?.data.service.title !== undefined && <h3>{data?.data.service.title}</h3>}
                    {data?.data.service.array !== undefined && <CheckboxesList array={data?.data.service.array} setValue={setCheck} value={check} />}
                </>
                    : <>
                        <h3>Service</h3>
                        <CheckboxesList array={[{ name: "Priority start", price: 2 }]} setValue={setCheck} value={check} />
                    </>
                }


                {data?.data.runs !== undefined ? data?.data.hideCalculator && <>
                    {data?.data.runs !== undefined && <h3>{data?.data.runs.title}</h3>}
                    {data?.data.runs !== undefined && <Calculate value={runs} maxCount={data?.data.runs.count} setValue={setRuns} label={data?.data.runs.label} />}
                </>
                    : <>
                        <h3>Runs</h3>
                        <Calculate value={runs} maxCount={15} setValue={setRuns} label="Run(s)" />
                    </>
                }
            </div>

            <div className={styles.Bottom}>
                <h2>$ {price.toFixed(2)}</h2>
                <Button onClick={() => ({})}>Buy Now</Button>
            </div>
        </section>
    )
}

export default Order