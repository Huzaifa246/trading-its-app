import styles from "./index.module.css";
import React, { useState, useEffect } from 'react';
import { GoSortAsc } from "react-icons/go"
import { AiOutlineSetting } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { FaUser,FaQuestionCircle } from "react-icons/fa"; // Import Profile icon
import { RiLogoutBoxRLine } from "react-icons/ri";
import defImg1 from "../../../public/default-img.png";

const Navbar = () => {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    const navigate = useNavigate()
    const fullName = userDetails?.data?.fullName || "";
    const ProfileImg = userDetails?.data?.profile_image?.url;
    const [showDropdown, setShowDropdown] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    };
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 0) {
            setHasScrolled(true);
          } else {
            setHasScrolled(false);
          }
        };
  
        window.addEventListener('scroll', handleScroll);
  
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
      
    return (
        <nav className={`${styles.nav} ${hasScrolled ? styles.scrolled : ''}`}>
            <div className={styles.left}>
                <img src={ProfileImg || defImg1} alt="pic" />
                <h5>{fullName}</h5>
            </div>
            <div className={styles.right}>
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
                                    <a href="/profile" style={{ textDecoration: "none", fontSize: "1.5vh" }}>
                                        <FaUser style={{ paddingRight: "5px" }} /> <span style={{fontSize: "1.5vh" }}>Profile</span>
                                    </a>
                                </li>
                                <li className="li-style">
                                    <a href="/" style={{ textDecoration: "none", fontSize: "1.5vh" }}>
                                        <FaQuestionCircle style={{ paddingRight: "5px" }} /> <span style={{fontSize: "1.5vh" }}>Contact Support</span>
                                    </a>
                                </li>
                                <li className="li-style">
                                    <RiLogoutBoxRLine style={{ paddingRight: "5px", color: "red" }} />
                                    <button style={{ color: "red", backgroundColor: "transparent", border: "none" , fontSize: "1.5vh" }} onClick={handleLogout}>Logout</button>
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