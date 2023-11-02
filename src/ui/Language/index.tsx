import { FC } from "react"
import FlagEn from '@/assets/FlagEn.jpg'
import FlagGr from '@/assets/FlagGr.png'
import FlagFr from '@/assets/FlagFr.png'
import styles from './style.module.css'
import { ArrowDownIcon } from "../Icons"

interface Props {
    language: string;
}

const Language: FC<Props> = ({ language }) => {
    const langs = [
        { name: "En", flag: FlagEn },
        { name: "De", flag: FlagGr },
        { name: "Fr", flag: FlagFr },
    ]

    function fillLang() {
        switch (language) {
            case "En": return (<>
                <img src={langs[0].flag} alt="" />
                <p>{langs[0].name}</p>
            </>)
            case "De": return (<>
                <img src={langs[1].flag} alt="" />
                <p>{langs[1].name}</p>
            </>)
            case "Fr": return (<>
                <img src={langs[2].flag} alt="" />
                <p>{langs[2].name}</p>
            </>)
        }
    }

    return (
        <div className={styles.Language}>
            {fillLang()}
            <ArrowDownIcon className={styles.Icon} />
        </div>
    )
}

export default Language