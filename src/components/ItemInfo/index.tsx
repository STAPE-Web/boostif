import { useState } from "react"
import styles from './style.module.css'

const ItemInfo = () => {
    const [tab, setTab] = useState("Description")
    const tabs = ["Description", "Details", "Requirements"]

    function fillTabs() {
        switch (tab) {
            case "Description": return <>
                <div>
                    <h2>BUYING THIS BOOST YOU GET:</h2>
                    <ul>
                        <li>MYTHIC PLUS RUN DUNGEON BOOST of the chosen key level</li>
                        <li>EPIC GEAR up to 447 ilvl from Great Vault (iLvl depends on chosen key level)</li>
                        <li>MORE EPIC GEAR up to 431 ilvl from Dungeon Chest (iLvl depends on chosen key level)</li>
                        <li>MYTHIC PLUS RATING improved (if you haven't done this particular dungeon on chosen difficulty yet)</li>
                        <li>135 VALOR POINTS for each run (+65 extra points if you haven't completed the dungeon on 15 level yet)</li>
                        <li>All the other ITEMS and GOLD your character collects</li>
                        <li>A part of requirements towards KEYSTONE MASTER achievement</li>
                    </ul>
                </div>

                <div>
                    <h2>HOW SOON DO WE START?</h2>
                    <p>Normally we will be ready to start your order within 30 minutes after purchase. We don't like to waste your time. However, slight delays are possible when we are facing an unusual volume of orders.</p>
                </div>

                <div>
                    <h2>HOW LONG WILL IT TAKE?</h2>
                    <p>It's usually really fast, around 30 minutes per dungeon, but it's not guaranteed to be within the time limit. To request the within-time-limit Mythic+ run, please choose the respective option or simply contact us to add it to your order.</p>
                </div>
            </>

            case "Details": return <>
                <h2>HOW DO WE DO THIS BOOST?</h2>
                <ul>
                    <li>We receive your order and contact you within 15 min after that</li>
                    <li>We discuss details with you (realm, character's name, etc) and schedule your boost</li>
                    <li>At the appointed time our team takes your character to the Mythic+ dungeon of the chosen level</li>
                </ul>
            </>

            case "Requirements": return <>
                <h2>WHAT ARE THE REQUIREMENTS?</h2>
                <ul>
                    <li>Active WoW account</li>
                    <li>70 Lvl character</li>
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