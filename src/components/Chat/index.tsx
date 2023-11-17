import { useCallback, useEffect, useRef, useState } from "react"
import Message from "./Message"
import styles from './style.module.css'
import Input from "@/ui/Input"
import Button from "@/ui/Buttons/Square"
import { SendIcon } from "@/ui/Icons"
import API from '@/api/chat'

const Chat = () => {
    const [messageList, setMessageList] = useState([])
    const scrollable = useRef<any>(null)
    const [message, setMessage] = useState('')

    useEffect(() => {
        setTimeout(() => {
            if (scrollable.current !== null) {
                scrollable?.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1000)
    }, [])

    useEffect(() => {
        if (localStorage.getItem("session") === null) {
            localStorage.setItem("session", JSON.stringify(Date.now()))
        }
    }, [])

    async function sendMessage() {
        const session = localStorage.getItem("session")

        if (session !== null) {
            await API.message(session, {
                content: message,
                sender: "User",
            }).then(() => {
                setMessage("")
                scrollable?.current.scrollIntoView({ behavior: 'smooth' });
                getChatData()
            })
        }
    }

    const getChatData = useCallback(async () => {
        const session = localStorage.getItem("session")
        if (session !== null) {
            const data = await API.get(session)
            setMessageList(data)
        }
    }, [API])

    useEffect(() => {
        getChatData()
    }, [getChatData])

    return (
        <div className={styles.Chat}>
            <div className={styles.Messages}>
                {messageList.map(message => (
                    <Message key={messageList.indexOf(message)} data={message} />
                ))}
                <div ref={scrollable} />
            </div>

            <div className={styles.Controlls}>
                <Input label="" onChange={e => setMessage(e.target.value)} placeholder="Message..." type="text" value={message} />
                {message.length !== 0 && <Button onClick={() => sendMessage()}>
                    <SendIcon className={styles.SendIcon} />
                </Button>}
            </div>
        </div>
    )
}

export default Chat