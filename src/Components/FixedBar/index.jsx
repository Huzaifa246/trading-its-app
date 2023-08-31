import { BiHomeSmile, BiBarChartAlt2 } from "react-icons/bi"
import { BsWallet2 } from "react-icons/bs"
import { CgArrowsExchangeAltV } from "react-icons/cg"
import { MdOutlineManageHistory } from "react-icons/md"
import "./index.css"
import React, { useState } from "react"
const FixedBar = ({ fixedBarRef }) => {
    const [activeItem, setActiveItem] = useState("home"); // Set the initial active item

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const isItemActive = (item) => {
        return item === activeItem;
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
                color: isItemActive("home") ? "white" : "#a8a8a8",
                fontSize: "6vw"
            }}
                onClick={() => handleItemClick("home")}
            >
                <a href="/" className="a-tag-style">
                    <BiHomeSmile />
                    <p style={{ fontSize: "3vw" }}>Home</p>
                </a>
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
                <BsWallet2 style={{ scale: ".8" }} />
                <p style={{ fontSize: "3vw" }}>Wallet</p>
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
            }}>
                <a href="/deposit" className="a-tag-style exchange">
                    <div style={{
                        background: "#e1f8ff",
                        color: "#000",
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
                    <p style={{ fontSize: "3vw", marginBottom: "0" }}>Deposit</p>
                </a>
            </div>
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: ".4rem",
                fontWeight: "500",
                cursor: "pointer",
                color: isItemActive("allInvestment") ? "white" : "#a8a8a8",
                //#007aff
                fontSize: "6vw"
            }}
                onClick={() => handleItemClick("allInvestment")}
            >
                <a href="/allInvestment" className="a-tag-style">
                    <BiBarChartAlt2 />
                    <p style={{ fontSize: "3vw" }}>History</p>
                </a>
            </div>
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: ".4rem",
                fontWeight: "500",
                cursor: "pointer",
                color: isItemActive("withdraw") ? "white" : "#a8a8a8",
                fontSize: "6vw"
            }}>
                
                <a href="/withdraw" className="a-tag-style">
                    <MdOutlineManageHistory />
                    <p style={{ fontSize: "3vw" }}>WithDrawal</p>
                </a>
            </div>
        </div>
    )
}

export default FixedBar;