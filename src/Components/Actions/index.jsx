import styles from "./index.module.css"
import { BsSend } from "react-icons/bs"
import { CiBadgeDollar } from "react-icons/ci"
import { MdSwapCalls } from "react-icons/md"

const Actions = () => {
    const data = [
        {
            name: "Send",
            icon: <BsSend />
        },
        {
            name: "Receive",
            icon: <BsSend style={{ rotate: "180deg" }} />
        },
        {
            name: "Buy",
            icon: <CiBadgeDollar />
        },
        {
            name: "Swap",
            icon: <MdSwapCalls style={{ rotate: "90deg" }} />
        },
    ]
    return (
        <div className={styles.container}>
            {
                data.map(item => (
                    <div key={item.name} className={styles.item}>
                        {item.icon}
                        <span>{item.name.toUpperCase()}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default Actions