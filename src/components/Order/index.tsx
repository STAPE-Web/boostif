import Button from "@/ui/Buttons/Default"
import { useState, useEffect, FC } from "react"
import styles from './style.module.css'
import CheckboxesList from "@/components/CheckboxesList"
import Calculate from "@/components/Calculate"
import { IService } from "@/types"
import Select from "@/ui/Select"
import { IArray, IArray2 } from "@/store/types/admin"
import MultiSlider from "../MultiSlider"
import { useNavigate } from "react-router-dom"

interface Props {
    data: IService | null
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    selectPrice: React.Dispatch<React.SetStateAction<string>>
    setModalData: React.Dispatch<React.SetStateAction<string>>
}

const Order: FC<Props> = ({ data, setModal, setModalData, selectPrice }) => {
    const [value, setValue] = useState<IArray | null>(null)
    const [difficulty, setDifficulty] = useState<IArray | null>(null)
    const [check, setCheck] = useState<IArray2[]>([])
    const [runs, setRuns] = useState(1)
    const [level, setLevel] = useState([1, 2])
    const [price, setPrice] = useState(0)
    const [oldPrice, setOldPrice] = useState(0)

    const platforms = ["PC", "Xbox", "PS"]
    const navigate = useNavigate()

    useEffect(() => {
        if (data !== undefined) {
            setPrice(((check.reduce((acc, number) => acc
                + (data?.data.platform !== undefined ? number.price[data.data.platform.hidden ? platforms.findIndex(i => i === value?.name) : 0] : 0), 0))
                + (data?.data.level !== undefined && data?.data.level.hidden ? Math.abs(level[1] - level[0]) * (data?.data.level.price !== undefined ? data?.data.level.price : 0) : 0)
                + (value?.price || 0)
                + (difficulty?.price || 0)
                + (data?.data.runs !== undefined && data?.data.runs.label.trim() !== "Run(s)" ? runs * data?.data.runs.price || 0 : 0)
            ) * (data?.data.runs.label.trim() === "Run(s)" ? runs : 1 * (data?.data.runs.label.trim() === "Run(s)" ? data?.data.runs.price : 1))
            );

            setOldPrice(((Number(data?.data.oldPrice) - Number(data?.data.price))
                + (check.reduce((acc, number) => acc
                    + (data?.data.platform !== undefined ? number.price[data.data.platform.hidden ? platforms.findIndex(i => i === value?.name) : 0] : 0), 0))
                + (data?.data.level !== undefined && data?.data.level.hidden ? Math.abs(level[1] - level[0]) * (data?.data.level.price !== undefined ? data?.data.level.price : 0) : 0)
                + (value?.price || 0)
                + (difficulty?.price || 0)
                + (data?.data.runs !== undefined && data?.data.runs.label.trim() !== "Run(s)" ? runs * data?.data.runs.price || 0 : 0)
            ) * (data?.data.runs.label.trim() === "Run(s)" ? runs : 1 * (data?.data.runs.label.trim() === "Run(s)" ? data?.data.runs.price : 1))
            )
        }
    }, [check, runs, data, value, difficulty, level]);

    async function Payment() {
        setModal(true)
        // const roundedPrice = Math.round(price * 100);
        // const data = await axios.post(
        //     `${import.meta.env.VITE_SERVER}/payment`,
        //     {
        //         price: roundedPrice,
        //     },
        // ).then(res => res.data);

        // console.log(data)
        // window.location.replace(data.session.url)
    }

    useEffect(() => {
        setModalData(`${value !== null ? value.name : ""} ${difficulty !== null ? `· ${difficulty.name}` : ""}`)

        selectPrice(String(price))
    }, [value, difficulty, price])

    return (
        <section className={styles.Order}>
            <div className={styles.Top}>
                {data?.data.platform !== undefined && data.data.platform.hidden && <>
                    {data?.data.platform.title !== undefined && <h3>{data?.data.platform.title}</h3>}
                    {data?.data.platform.array !== undefined && <Select array={data?.data.platform.array} setValue={setValue} value={value} />}
                </>}

                {data?.data.difficulty !== undefined && data.data.difficulty.hidden && <>
                    {data?.data.difficulty.title !== undefined && <h3>{data?.data.difficulty.title}</h3>}
                    {data?.data.difficulty.array !== undefined && <Select array={data?.data.difficulty.array} setValue={setDifficulty} value={difficulty} />}
                </>}

                {data?.data.level !== undefined && data?.data.level.hidden && <>
                    {data?.data.level !== undefined && <h3>{data?.data.level.title}</h3>}
                    {data?.data.level !== undefined && <MultiSlider value={level} maxCount={data?.data.level.count} setValue={setLevel} label={data?.data.level.label} />}
                </>}

                {data?.data.service !== undefined && data.data.service.hidden && <>
                    {data?.data.service.title !== undefined && <h3>{data?.data.service.title}</h3>}
                    {data?.data.service.array !== undefined && <CheckboxesList array={data?.data.difficulty.hidden
                        ? difficulty !== null ? data?.data.service.array.filter(i => i.class.includes(difficulty?.name)) : []
                        : data?.data.service.array
                    } setValue={setCheck} value={check} />}
                </>}

                {data?.data.runs !== undefined && data?.data.hideCalculator && <>
                    {data?.data.runs !== undefined && <h3>{data?.data.runs.title}</h3>}
                    {data?.data.runs !== undefined && <Calculate value={runs} maxCount={data?.data.runs.count} setValue={setRuns} label={data?.data.runs.label} />}
                </>}
            </div>

            <div className={styles.Bottom}>
                <div className={styles.Row}>
                    <h2>$ {(!Number.isNaN(price) ? price : 0).toFixed(2)}</h2>
                    {data?.data.oldPrice !== undefined && <h4>${(!Number.isNaN(oldPrice) ? oldPrice : 0).toFixed(2)}</h4>}
                </div>

                <Button onClick={() => localStorage.getItem("userId") === null ? navigate("/signin") : Payment()}>Buy Now</Button>
            </div>
        </section>
    )
}

export default Order