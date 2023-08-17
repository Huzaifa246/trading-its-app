import styles from "./index.module.css"
import { FaArrowTrendUp } from "react-icons/fa6"
import { TbEyeHeart } from "react-icons/tb"
import { savedDataString } from "../../helpers/UserDetails/UserDetails";

const Balance = () => {
    const savedDataProfile = JSON.parse(savedDataString);
    const totalBalance = savedDataProfile?.data?.totalbalance || " ";
    const userProfit = savedDataProfile?.data?.profit || " " || "No Profit";
    return (
        <div className={styles.balance}>
            <div className={styles.left}>
                <h5>Portfolio Balance</h5>
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
                        <span>{userProfit.toFixed(2)}%</span>
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