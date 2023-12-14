import { useState, FC } from "react"
import styles from './style.module.css'
import { IService } from "@/types"

interface Props {
    data: IService | null
}

const ItemInfo: FC<Props> = ({ data }) => {
    const [tab, setTab] = useState("Description")
    const tabs = ["Description", "Details", "Requirements"]

    function fillTabs() {
        switch (tab) {
            case "Description": return <>
                <div>
                    {data?.data.description !== undefined
                        ? <p>{data?.data.description}</p>
                        : <p>No Description</p>
                    }
                </div>
            </>

            case "Details": return <>
                <h2>HOW DO WE DO THIS BOOST?</h2>
                <ul>
                    {data?.data.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                    ))}
                </ul>
            </>

            case "Requirements": return <>
                <h2>WHAT ARE THE REQUIREMENTS?</h2>
                <ul>
                    {data?.data.requirements.map((detail, index) => (
                        <li key={index}>{detail}</li>
                    ))}
                </ul>
            </>
        }
    }

    return (
        <section className={styles.Section}>
            <div className={styles.Tabs}>
                {tabs.map(t => (
                    <div key={tabs.indexOf(t)} className={t === tab ? styles.Active : ''} onClick={() => setTab(t)}>{t}</div>
                ))}
            </div>

            <div className={styles.Info}>
                {fillTabs()}
            </div>
        </section>
    )
}

export default ItemInfo