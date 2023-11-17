import { IMessageRes } from "@/types"
import { FC } from "react"
import styles from './style.module.css'

interface Props {
    data: IMessageRes
}

const Message: FC<Props> = ({ data }) => {

    function formatData() {
        const timestamp: any = data.timestamp
        const timestampToDate = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);
        const minutes = timestampToDate.getMinutes()
        const hours = timestampToDate.getHours()

        return `${hours}:${minutes}`
    }

    return (
        <>
            {data.messageData.sender === "User"
                ? <div className={styles.User}>
                    <div>
                        <p className={styles.Content}>{data.messageData.content}</p>
                        <p className={styles.Timestamp}>{formatData().toLocaleString()}</p>
                    </div>
                </div>
                : <div className={styles.Support}>
                    <div>
                        <p className={styles.Content}>{data.messageData.content}</p>
                        <p className={styles.Timestamp}>{formatData().toLocaleString()}</p>
                    </div>
                </div>
            }
        </>
    )
}

export default Message;