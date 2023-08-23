import styles from "./index.module.css"
import { BsSend } from "react-icons/bs"
import { CiBadgeDollar } from "react-icons/ci"
import { MdSwapCalls } from "react-icons/md"
import { useSelector } from "react-redux";
const Actions = () => {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    console.log(userDetails)

    let withdrawable = userDetails?.data?.withdrawable || 0;
    let investmentBalance = userDetails?.data?.investmentBalance || 0;
    let teamCommissionBalance = userDetails?.data?.teamCommissionBalance || 0;

    const TableData = [
        {
            name: "Invested",
            value: withdrawable
        },
        {
            name: "Commission",
            value: investmentBalance
        },
        {
            name: "WithDraw",
            value: teamCommissionBalance
        },
    ]
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
        <>
             <div className={styles.container}>
                {
                    TableData?.map(item => (
                        <div key={item.name} className={styles.itemInvestment}>
                            <span>{item.name.toUpperCase()}</span>
                            {item.value !== undefined ? item.value.toFixed(2) : "N/A"}
                        </div>
                    ))
                }
            </div>
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
        </>
    )
}

export default Actions