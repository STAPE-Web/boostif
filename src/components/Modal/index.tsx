import Input from "@/ui/Input"
import styles from "./style.module.css"
import useAdminStore from "@/store/admin"
import { ChangeEvent, useEffect, useState } from "react"
import Button from "@/ui/Buttons/Default"
import Toggle from "../Toggle"
import { AddIcon, DeleteIcon } from "@/ui/Icons"

const Modal = () => {
    const modal = useAdminStore(state => state.modal)
    const changeModal = useAdminStore(state => state.changeModal)

    const [platformTitle, setTitlePlatform] = useState("")
    const [platformHidden, setHiddenPlatform] = useState(false)

    const [serviceTitle, setTitleService] = useState("")
    const [serviceHidden, setHiddenService] = useState(false)

    const [calculatorHidden, setCalculatorHidden] = useState(false)

    const [difficultyTitle, setTitleDifficulty] = useState("")
    const [difficultyHidden, setHiddenDifficulty] = useState(false)

    const details = useAdminStore(state => state.data.details)
    const changeDetails = useAdminStore(state => state.changeDetails)
    const requirements = useAdminStore(state => state.data.requirements)
    const changeRequirements = useAdminStore(state => state.changeRequirements)
    const platform = useAdminStore(state => state.data.platform)
    const changePlatform = useAdminStore(state => state.changePlatform)
    const service = useAdminStore(state => state.data.service)
    const changeService = useAdminStore(state => state.changeService)
    const runs = useAdminStore(state => state.data.runs)
    const changeRuns = useAdminStore(state => state.changeRuns)
    const difficulty = useAdminStore(state => state.data.difficulty)
    const changeDifficulty = useAdminStore(state => state.changeDifficulty)
    const hideCalc = useAdminStore(state => state.data.hideCalculator)
    const changeCalculator = useAdminStore(state => state.changeCalculator)

    const [tab, setTab] = useState("Details")
    const tabs = ["Details", "Requirements", "Platform", "Service", "Runs", "Difficulty"]

    useEffect(() => {
        setTitlePlatform(platform.title)
        setHiddenPlatform(platform.hidden)

        setTitleService(service.title)
        setHiddenService(service.hidden)

        setTitleDifficulty(difficulty.title)
        setHiddenDifficulty(difficulty.hidden)

        setCalculatorHidden(hideCalc)
    }, [platform, service, difficulty, hideCalc])

    const handleDetails = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newData = [...details];
        if (index !== undefined) newData[index] = e.target.value;
        changeDetails(newData);
    };

    const handleRequirements = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newData = [...requirements];
        if (index !== undefined) newData[index] = e.target.value;
        changeRequirements(newData);
    };

    const handlePlatform = (e: ChangeEvent<HTMLInputElement>, index: number, state: string) => {
        const newData = [...platform.array];
        if (state === "price") newData[index].price = Number(e.target.value);
        if (state === "hidden") newData[index].hidden = !newData[index].hidden;
        changePlatform({
            array: newData,
            hidden: platform.hidden,
            title: platform.title
        });
    };

    const handleService = (e: ChangeEvent<HTMLInputElement>, index: number, state: string) => {
        const newData = [...service.array];
        if (state === "name") newData[index].name = e.target.value;
        if (state === "price") newData[index].price = Number(e.target.value);
        changeService({
            array: newData,
            hidden: service.hidden,
            title: service.title
        });
    };

    const handleDifficulty = (e: ChangeEvent<HTMLInputElement>, index: number, state: string) => {
        const newData = [...difficulty.array];
        if (state === "name") newData[index].name = e.target.value;
        if (state === "price") newData[index].price = Number(e.target.value);
        changeDifficulty({
            array: newData,
            hidden: difficulty.hidden,
            title: difficulty.title
        });
    };

    const handleRuns = (e: ChangeEvent<HTMLInputElement>, state: string) => {
        const newData = { ...runs }
        if (state === "title") newData.title = e.target.value;
        if (state === "count") newData.count = Number(e.target.value);
        if (state === "label") newData.label = e.target.value;
        changeRuns(newData)
    };

    function fillTabs() {
        switch (tab) {
            case "Details": return <>
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

            case "Requirements": return <>
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

            case "Platform": return <>
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

            case "Service": return <>
                <div className={styles.Row2}>
                    <h2>{tab}</h2>
                    <Toggle state={serviceHidden} onChange={() => setHiddenService(!serviceHidden)} />
                </div>

                <Input label="" onChange={e => setTitleService(e.target.value)} placeholder={"Service Title"} type="text" value={serviceTitle} />

                {service.array.map((item, index) => (
                    <div className={styles.Row} key={index}>
                        <Input label="" onChange={e => handleService(e, index, "name")} placeholder={"Service Name"} type="text" value={item.name} />
                        <Input label="" onChange={e => handleService(e, index, "price")} placeholder="Price" type="number" value={item.price} />
                        <DeleteIcon className={styles.DeleteIcon} onClick={() => changeService({
                            hidden: service.hidden, title: service.title,
                            array: service.array.filter((_, id) => id !== index)
                        })} />
                    </div>
                ))}
                <button className={styles.ButtonUpdate} onClick={() => changeService({
                    hidden: service.hidden, title: service.title,
                    array: [...service.array, { name: "", price: 0 }]
                })}>
                    <AddIcon />
                </button>
            </>

            case "Runs": return <>
                <div className={styles.Row2}>
                    <h2>{tab}</h2>
                    <Toggle state={calculatorHidden} onChange={() => setCalculatorHidden(!calculatorHidden)} />
                </div>
                <Input label="" onChange={e => handleRuns(e, "title")} placeholder={"Runs Title"} type="text" value={runs.title} />
                <Input label="" onChange={e => handleRuns(e, "label")} placeholder={"Runs Label"} type="text" value={runs.label} />
                <Input label="Runs Max Count" onChange={e => handleRuns(e, "count")} placeholder={""} type="number" value={runs.count} />
            </>

            case "Difficulty": return <>
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
        }
    }

    useEffect(() => {
        changePlatform({
            array: platform.array,
            hidden: platformHidden,
            title: platformTitle
        })

        changeService({
            array: service.array,
            hidden: serviceHidden,
            title: serviceTitle
        })

        changeDifficulty({
            array: difficulty.array,
            hidden: difficultyHidden,
            title: difficultyTitle
        })

        changeCalculator(calculatorHidden)
    }, [platformHidden, platformTitle, serviceTitle, serviceHidden, calculatorHidden, difficultyHidden, difficultyTitle])

    return (
        <>
            {modal && <div className={styles.Modal} onClick={() => changeModal(false)}>
                <div className={styles.Box} onClick={e => e.stopPropagation()}>
                    <div className={styles.Tabs}>
                        {tabs.map(t => (
                            <div key={tabs.indexOf(t)} className={t === tab ? styles.Active : ''} onClick={() => setTab(t)}>{t}</div>
                        ))}
                    </div>

                    <div className={styles.Content}>
                        {fillTabs()}
                    </div>

                    <Button onClick={() => changeModal(false)}>Save</Button>
                </div>
            </div>}
        </>
    )
}

export default Modal