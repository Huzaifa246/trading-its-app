import styles from "./index.module.css"
import { FaArrowTrendUp } from "react-icons/fa6"
import { TbEyeHeart } from "react-icons/tb"
import { savedDataString } from "../../helpers/UserDetails/UserDetails";

const Balance = () => {
    let totalBalance = 59.00; // Default value
    let userProfit = "Ali"; // Default value

    try {
        const savedDataProfile = JSON.parse(savedDataString);
        totalBalance = savedDataProfile?.data?.totalbalance || totalBalance;
        userProfit = savedDataProfile?.data?.profit || userProfit;
    } catch (error) {
        console.error("Error parsing JSON data:", error);
    }

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
                        <select>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                    </div>
                    <div>
                        <span>{userProfit}%</span>
                        <FaArrowTrendUp />
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