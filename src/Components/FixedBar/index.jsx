import { BiHomeSmile, BiBarChartAlt2 } from "react-icons/bi"
import { BsWallet2 } from "react-icons/bs"
import { CgArrowsExchangeAltV } from "react-icons/cg"
import { MdOutlineManageHistory } from "react-icons/md"
import "./index.css"
import React, { useState } from "react"
import { NavLink } from "react-router-dom";

const FixedBar = ({ fixedBarRef }) => {
    const [activeItem, setActiveItem] = useState("");

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const handleLinkClick = (item, event) => {
        // Check if it's the same link before preventing default
        if (activeItem !== item) {
            setActiveItem(item);
        } else {
            event.preventDefault(); // Prevent navigation for the current active item
        }
    };
    return (
        <div style={{
            position: "fixed",
            bottom: "0px",
            left: "10px",
            width: "calc(100% - 20px)",
            borderRadius: "20px",
            padding: "1rem",
            display: "flex",
            gap: "1rem",
            zIndex: 999999,
        }} ref={fixedBarRef} className="fixed__bar">
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: ".4rem",
                fontWeight: "500",
                cursor: "pointer",
                color: activeItem === "home" ? "blue" : "#a8a8a8",
                fontSize: "6vw"
            }}
                onClick={() => handleItemClick("home")}
            >
                <NavLink to="/" className="a-tag-style" onClick={(event) => handleLinkClick("home", event)}>
                    <BiHomeSmile style={{ color: activeItem === "home" ? "blue" : "#a8a8a8" }} />
                    <p style={{ fontSize: "3vw", color: activeItem === "home" ? "blue" : "#a8a8a8" }}>Home</p>
                </NavLink>
            </div>
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: ".4rem",
                fontWeight: "500",
                cursor: "pointer",
                color: "#a8a8a8",
                fontSize: "6vw"
            }}>
                <BsWallet2 style={{ scale: ".8", color: activeItem === "wallet" ? "blue" : "#a8a8a8" }} />
                <p style={{ fontSize: "3vw", color: activeItem === "wallet" ? "blue" : "#a8a8a8" }}>Wallet</p>
            </div>
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: ".4rem",
                fontWeight: "500",
                cursor: "pointer",
                color: "#a8a8a8"
            }}
                onClick={() => handleItemClick("deposit")}
            >
                <NavLink to="/deposit" className="a-tag-style exchange" 
                onClick={(event) => handleLinkClick("deposit", event)}>
                    <div style={{
                        background: "#e1f8ff",
                        color: activeItem === "deposit" ? "blue" : "#000",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        scale: "2.5",
                        transformOrigin: "bottom center",
                        borderRadius: "2vw",
                        fontSize: "6vw"
                    }}>
                        <CgArrowsExchangeAltV style={{ boxShadow: "0 0 2px  #e1f8ff", borderRadius: "2vw" }} />
                    </div>
                    <p style={{ fontSize: "3vw", marginBottom: "0", color: activeItem === "deposit" ? "blue" : "#a8a8a8" }}>Deposit</p>
                </NavLink>
            </div>
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: ".4rem",
                fontWeight: "500",
                cursor: "pointer",
                color: activeItem === "allInvestment" ? "blue" : "#a8a8a8",
                fontSize: "6vw"
            }}
                onClick={() => handleItemClick("allInvestment")}
            >
                <NavLink to="/allInvestment" className="a-tag-style"
                onClick={(event) => handleLinkClick("allInvestment", event)}
                >
                    <BiBarChartAlt2 style={{ color: activeItem === "allInvestment" ? "blue" : "#a8a8a8" }} />
                    <p style={{ fontSize: "3vw", color: activeItem === "allInvestment" ? "blue" : "#a8a8a8" }}>History</p>
                </NavLink>
            </div>
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: ".4rem",
                fontWeight: "500",
                cursor: "pointer",
                color: activeItem === "withdraw" ? "blue" : "#a8a8a8",
                fontSize: "6vw"
            }}
                onClick={() => handleItemClick("withdraw")}
            >
                <NavLink to="/withdraw" className="a-tag-style" 
                onClick={(event) => handleLinkClick("withdraw", event)}
                >
                    <MdOutlineManageHistory style={{ color: activeItem === "withdraw" ? "blue" : "#a8a8a8" }} />
                    <p style={{ fontSize: "3vw", color: activeItem === "withdraw" ? "blue" : "#a8a8a8" }}>WithDrawal</p>
                </NavLink>
            </div>
        </div>
    )
}

export default FixedBar;
