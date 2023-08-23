import styles from "./index.module.css"
import { FaArrowTrendUp } from "react-icons/fa6"
import { TbEyeHeart } from "react-icons/tb"
import { useSelector } from "react-redux";

const Balance = () => {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    console.log(userDetails)

    let totalBalance = userDetails?.data?.totalbalance + userDetails?.data?.withdrawable || "0"; // Default value
    let userProfit =  userDetails?.data?.totalbalance || "0";
    let investmentBalance = userDetails?.data?.investmentBalance;
    let teamCommissionBalance = userDetails?.data?.teamCommissionBalance;
    return (
        <div className={styles.balance}>
            <div className={styles.left}>
                <h5>Total Balance</h5>
                <div>
                    <div>
                        <h2>
                            <span>$ </span>
                            {totalBalance}
                            {/* <span>00</span> */}
                        </h2>
                        <select>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                    </div>
                    <div>
                        <span>{userProfit}</span>
                        <FaArrowTrendUp />

                        <span>{investmentBalance}</span>
                        <span>{teamCommissionBalance}</span>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <TbEyeHeart />
            </div>
        </div>
    )
}

export default Balance