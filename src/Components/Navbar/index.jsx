import styles from "./index.module.css";
import React, { useState } from 'react';
import { GoSortAsc } from "react-icons/go"
import { AiOutlineSetting } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa"; // Import Profile icon
import { RiLogoutBoxRLine } from "react-icons/ri";
import defImg1 from "../../../public/default-img.png";

const Navbar = () => {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    const navigate = useNavigate()
    const fullName = userDetails?.data?.fullName || "User Not Found";
    const ProfileImg = userDetails?.data?.profile_image?.url;
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    };
    return (
        <nav className={styles.nav}>
            <div className={styles.left}>
                <img src={ProfileImg || defImg1} alt="pic" />
                <h5>{fullName}</h5>
            </div>
            <div className={styles.right}>
                <GoSortAsc />
                <div className={`${styles.settingIconContainer} dropdown-container`}>
                    <AiOutlineSetting style={{
                        height: "2.8vh",
                        marginBottom: "5px"
                    }}
                        onClick={() => setShowDropdown(!showDropdown)}
                    />
                    {showDropdown && (
                        <div className={`${styles.dropdown} dropdown-menu`}>
                            <ul>
                                <li className="li-style">
                                    <a href="/profile" style={{ textDecoration: "none" }}>
                                        <FaUser style={{ paddingRight: "5px" }} /> Profile
                                    </a>
                                </li>
                                <li className="li-style">
                                    <RiLogoutBoxRLine style={{ paddingRight: "5px", color: "red" }} />
                                    <button style={{ color: "red", backgroundColor: "transparent", border: "none" }} onClick={handleLogout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;