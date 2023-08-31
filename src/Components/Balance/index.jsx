import styles from "./index.module.css"
import { FaArrowTrendUp } from "react-icons/fa6"
import { TbEyeHeart } from "react-icons/tb"
import { useSelector } from "react-redux";

const Balance = () => {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    console.log(userDetails)

    let totalBalance = userDetails?.data?.totalbalance + userDetails?.data?.withdrawable || 0; // Default value
    let availableBalance = userDetails?.data?.totalbalance || 0;
    
    return (
        <div className={styles.balance}>
            <div className={styles.left}>
                <h5>Total Balance</h5>
                <div>
                    <div>
                        <h2>
                            <span>$ </span>
                            {totalBalance.toFixed(2)}
                            {/* <span>00</span> */}
                        </h2>
                    </div>
                </div>
            </div>
            {/* <div className={styles.right}>
                <div>
                    <h5>Available Balance</h5>
                </div>
                <div>
                    <span>{availableBalance?.toFixed(2)}</span>
                </div>
            </div> */}
        </div>
    )
}

export default Balance