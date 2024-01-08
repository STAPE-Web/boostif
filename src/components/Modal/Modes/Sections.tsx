import { FC, useCallback, useEffect, useState } from "react"
import SelectString from "@/ui/SelectString"
import useAdminStore from "@/store/admin"
import APIGame from "@/api/games"

interface Props {
    tab: string
}

const Sections: FC<Props> = ({ tab }) => {
    const section = useAdminStore(state => state.data.section)
    const changeSection = useAdminStore(state => state.changeSection)
    const activePage = useAdminStore(state => state.activePage)
    const [game, setGame] = useState([])

    const getGame = useCallback(async () => {
        setGame([])
        const res = await APIGame.getOne(activePage)
        setGame(res.data.sections)
    }, [APIGame, activePage])

    useEffect(() => {
        getGame()
    }, [getGame])

    return (
        <>
            <h2>{tab}</h2>
            <SelectString array={game} setValue={changeSection} value={section} />
        </>
    )
}

export default Sections