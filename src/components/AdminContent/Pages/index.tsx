import useAdminStore from "@/store/admin"
import styles from "./style.module.css"
import { useCallback, useEffect, useState } from "react"
import TextEditor from "@/components/TextEditor"
import Button from "@/ui/Buttons/Default"
import API from "@/api/pages"

const Pages = () => {
    const [html, setHtml] = useState<string>("")
    const activePage = useAdminStore(state => state.activePage)
    const pages = [
        { id: 18, name: "Terms & Conditions" },
        { id: 19, name: "Privacy Policy" },
        { id: 20, name: "Contact Us" },
        { id: 21, name: "Cookie Policy" },
        { id: 22, name: "Refund Policy" },
        { id: 23, name: "Work with us" },
    ]

    async function updateData() {
        await API.update(activePage, html).then(() => setHtml("")).then(() => getData())
    }

    const getData = useCallback(async () => {
        const data = await API.getOne(activePage)
        if (data.data.html !== undefined) {
            setHtml(data.data.html)
        } else {
            setHtml("")
        }
    }, [API, activePage])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <div className={styles.Module}>
            <h1>Edit Page: <span>{pages[pages.findIndex(i => i.id === Number(activePage))].name}</span></h1>
            <TextEditor onChange={setHtml} value={html} big />
            <Button onClick={() => updateData()}>Update</Button>
        </div>
    )
}

export default Pages