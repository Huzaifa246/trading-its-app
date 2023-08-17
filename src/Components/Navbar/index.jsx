import styles from "./index.module.css"
import { GoSortAsc } from "react-icons/go"
import { IoMdNotificationsOutline } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { savedDataString } from "../../helpers/UserDetails/UserDetails"

const Navbar = () => {
    const navigate = useNavigate()
    const savedDataProfile = JSON.parse(savedDataString);
    const fullName = savedDataProfile?.data?.fullName || savedDataProfile?.data?.name || "User Not Found";
    const ProfileImg = savedDataProfile?.data?.profile_image?.url;


    return (
        <nav className={styles.nav}>
            <div className={styles.left} onClick={() => {
                localStorage.removeItem("token")
                localStorage.removeItem("mySession")
                navigate("/login")
            }}>
                <img src={ProfileImg} alt="gc" />
                <h5>{fullName}</h5>
            </div>
            <div className={styles.right}>
                <GoSortAsc />
                <IoMdNotificationsOutline />
            </div>
        </nav>
    )
}

export default Navbar;