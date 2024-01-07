import styles from "./style.module.css"
import useAdminStore from "@/store/admin"
import { ChangeEvent, useEffect, useState } from "react"
import Button from "@/ui/Buttons/Default"
import Details from "./Modes/Details"
import Requirements from "./Modes/Requirements"
import Platform from "./Modes/Platform"
import Service from "./Modes/Service"
import Runs from "./Modes/Runs"
import Difficulty from "./Modes/Difficulty"
import Level from "./Modes/Level"

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

    const [levelHidden, setHiddenLevel] = useState(false)

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
    const level = useAdminStore(state => state.data.level)
    const changeLevel = useAdminStore(state => state.changeLevel)

    const [tab, setTab] = useState("Details")
    const tabs = ["Details", "Requirements", "Platform", "Service", "Runs", "Difficulty", "Level"]

    useEffect(() => {
        setTitlePlatform(platform.title)
        setHiddenPlatform(platform.hidden)

        setTitleService(service.title)
        setHiddenService(service.hidden)

        setTitleDifficulty(difficulty.title)
        setHiddenDifficulty(difficulty.hidden)

        setHiddenLevel(level.hidden)

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

    const handleService = (e: ChangeEvent<HTMLInputElement>, index: number, state: string, priceIndex?: number) => {
        const newData = [...service.array];
        if (state === "name") newData[index].name = e.target.value;
        if (state === "price" && priceIndex !== undefined) newData[index].price[priceIndex] = Number(e.target.value);
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
        if (state === "price") newData.price = Number(e.target.value);
        if (state === "label") newData.label = e.target.value;
        changeRuns(newData)
    };

    const handleLevel = (e: ChangeEvent<HTMLInputElement>, state: string, index?: number) => {
        const newData = { ...level }
        if (state === "title") newData.title = e.target.value;
        if (state === "count") newData.count = Number(e.target.value);
        if (state === "price") newData.price = Number(e.target.value);
        if (state === "label" && index !== undefined) newData.label[index] = e.target.value;
        console.log(newData)
        changeLevel(newData)
    };

    function fillTabs() {
        switch (tab) {
            case "Details": return <Details tab={tab} handleDetails={handleDetails} />
            case "Requirements": return <Requirements tab={tab} handleRequirements={handleRequirements} />
            case "Platform": return <Platform tab={tab} platformHidden platformTitle={platformTitle} handlePlatform={handlePlatform} setHiddenPlatform={setHiddenPlatform} setTitlePlatform={setTitlePlatform} />
            case "Service": return <Service handleService={handleService} tab={tab} serviceHidden serviceTitle={serviceTitle} setHiddenService={setHiddenService} setTitleService={setTitleService} />
            case "Runs": return <Runs handleRuns={handleRuns} calculatorHidden setCalculatorHidden={setCalculatorHidden} tab={tab} />
            case "Difficulty": return <Difficulty handleDifficulty={handleDifficulty} difficultyHidden difficultyTitle={difficultyTitle} setHiddenDifficulty={setHiddenDifficulty} setTitleDifficulty={setTitleDifficulty} tab={tab} />
            case "Level": return <Level handleLevel={handleLevel} levelHidden setHiddenLevel={setHiddenLevel} tab={tab} />
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

        changeLevel({ ...level, hidden: levelHidden })

        changeCalculator(calculatorHidden)
    }, [platformHidden, platformTitle, serviceTitle, serviceHidden, calculatorHidden, difficultyHidden, difficultyTitle, levelHidden])

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