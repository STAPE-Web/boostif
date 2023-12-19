import API from "@/api/pages"
import { useCallback, useEffect, useState } from "react"
import styles from "./style.module.css"
import useGlobalStore from "@/store"

const Other = () => {
    const [html, setHtml] = useState<string>("")
    const pages = [
        { id: 18, name: "Terms & Conditions", path: "/terms" },
        { id: 19, name: "Privacy Policy", path: "/privacy" },
        { id: 20, name: "Contact Us", path: "/contact" },
        { id: 21, name: "Cookie Policy", path: "/cookie" },
        { id: 22, name: "Refund Policy", path: "/refund" },
        { id: 23, name: "Work with us", path: "/work" },
    ]

    const getData = useCallback(async () => {
        const path = window.location.pathname
        const data = await API.getOne(String(pages[pages.findIndex(i => i.path === path)].id))
        setHtml(data.data.html)
    }, [API, pages])

    useEffect(() => {
        getData()
    }, [getData])

    const changeHeaderShown = useGlobalStore(state => state.changeHeaderShown)
    const changePage = useGlobalStore(state => state.changePage)

    useEffect(() => {
        changeHeaderShown(true)
        changePage("Home")
    }, [])

    return (
        <div className={styles.Page} dangerouslySetInnerHTML={{ __html: html }} />
    )
}

export default Other