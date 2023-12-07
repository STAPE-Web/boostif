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
                    <p>When you purchase this boost, you receive a Mythic Plus Run Dungeon Boost at your chosen key level, expertly completed by a professional team, ensuring a seamless run without the hassle of LFG groups. Whether you provide your key or use ours, you'll obtain epic gear up to 483 ilvl from the Great Vault and additional epic gear up to 470 ilvl from the Dungeon Chest, the item levels varying based on your chosen key level. Your Mythic Plus rating will improve if the selected dungeon hasn't been completed on the chosen difficulty yet. Alongside, you'll acquire Crest Fragments and Flightstones currency. We aim to start your order within 30 minutes of purchase, minimizing delays, though unusual order volumes may cause slight delays. The process is generally swift, taking around 30 minutes per dungeon, but the specific time frame isn't guaranteed. For a within-time-limit Mythic+ run, choose the corresponding option or contact us to add it to your order. Check the table for this season's Mythic+ key levels and the associated item levels for completion and the subsequent weekly reset.</p>
                </div>
            </>

            case "Details": return <>
                <h2>HOW DO WE DO THIS BOOST?</h2>
                <ul>
                    {data?.data.details.map(detail => (
                        <li key={data?.data.details.indexOf(detail)}>{detail}</li>
                    ))}
                </ul>
            </>

            case "Requirements": return <>
                <h2>WHAT ARE THE REQUIREMENTS?</h2>
                <ul>
                    {data?.data.requirements.map(detail => (
                        <li key={data?.data.details.indexOf(detail)}>{detail}</li>
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