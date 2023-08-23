import styles from "./index.module.css";
import React from 'react';
import { GoSortAsc } from "react-icons/go"
import { IoMdNotificationsOutline } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";

const Navbar = () => {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    const navigate = useNavigate()
    const fullName = userDetails?.data?.fullName || "User Not Found";
    const ProfileImg = userDetails?.data?.profile_image?.url;
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    };
    const toggleDropdown = () => {
        if (dropdownRef.current) {
            const dropdown = new window.bootstrap.Dropdown(dropdownRef.current);
            dropdown.toggle();
        }
    };
    return (
        <nav className={styles.nav}>
            <div className={styles.left}
                onClick={() => {
                    localStorage.removeItem("token")
                    navigate("/login")
                }}
            // onClick={toggleDropdown}
            >
                <img src={ProfileImg} alt="pic" />
                <h5>{fullName}</h5>
            </div>
            <div>
                <a href="/Profile">
                    ProfileView
                </a>
            </div>
            {/* <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Options
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <a className="dropdown-item" href="#" onClick={handleLogout}>
                            Logout
                        </a>
                    </li>
                </ul>
            </div> */}
            <div className={styles.right}>
                <GoSortAsc />
                <IoMdNotificationsOutline />
            </div>
        </nav>
    )
}

export default Navbar;