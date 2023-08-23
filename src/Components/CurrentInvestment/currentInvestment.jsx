import React, { useState, useEffect, useRef } from 'react';
import styles from "./index.module.css";
import fetchAllTradeOption from '../../helpers/getApis/getAllOptions';
import { formatDateTime } from './../../helpers/DataFormat/DateFormat';
import fetchAllInvestment from '../../helpers/getApis/getAllInvestment';
import { useSelector } from "react-redux";
import Loader from '../Loader';

const CurrentInvest = () => {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    const userId = userDetails?.data?._id;

    const [tradeOptions, setTradeOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [investmentData, setInvestmentData] = useState([]);
    const [showAll, setShowAll] = useState(true);
    const [isLoading, setLoading] = useState(true);

    // useEffect(() => {
    //     async function fetchData() {
    //         const decryptedData = await fetchAllTradeOption();
    //         setTradeOptions(decryptedData.data);
    //         // fetchInvestmentData(selectedOption);
    //         if (showAll) {
    //             fetchInvestmentData(""); // Fetch all data initially if "Show All" is clicked
    //         } else {
    //             fetchInvestmentData(selectedOption);
    //         }
    //     }
    //     fetchData();
    // }, [userId]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true); // Set loading to true when fetching data
            try {
                const decryptedData = await fetchAllTradeOption();
                setTradeOptions(decryptedData.data);
                if (showAll) {
                    fetchInvestmentData("");
                } else {
                    fetchInvestmentData(selectedOption);
                }
            } catch (error) {
                console.error("Error fetching trade options:", error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        }
        fetchData();
    }, [userId]);
    const fetchInvestmentData = async (selectedOptionId) => {
        setSelectedOption(selectedOptionId);
        try {
            const investtype = 'current';
            const response = await fetchAllInvestment(userId, investtype, selectedOptionId);
            setInvestmentData(response.data);
        } catch (error) {
            console.error("Error fetching investment data:", error);
        }
    };
    const handleOptionClick = (optionId) => {
        setShowAll(false);
        setSelectedOption(optionId);
        fetchInvestmentData(optionId);
    };
    const handleShowAllClick = () => {
        setShowAll(true);
        setSelectedOption("");
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <div className={styles.container}>
                        <div
                            className={`${styles.item} ${showAll ? styles.selected : ''}`}
                            onClick={handleShowAllClick}
                            style={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}
                        >
                            <span>All</span>
                        </div>
                        {tradeOptions?.map(item => (
                            <div
                                key={item?._id}
                                className={`${styles.item} ${selectedOption === item?._id ? styles.selected : ''}`}
                                onClick={() => handleOptionClick(item?._id)}
                            >
                                <span>{item?.name.toUpperCase()}</span>
                            </div>
                        ))}

                    </div>
                    <div style={{
                        padding: ".5rem 1rem .5rem"
                    }}>
                        <div style={{
                            padding: ".5rem",
                        }}>
                            {tradeOptions.length > 0 && investmentData?.length > 0 ? (
                                investmentData.map(item => (
                                    (selectedOption === "" || item.investment_name._id === selectedOption) && (
                                        <div key={item._id} style={{
                                            display: "flex",
                                            alignItems: "center",
                                            color: "white",
                                            gap: "1rem",
                                            marginBottom: "1rem",
                                            justifyContent: "space-between"
                                        }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                                <img src={"https://s3.cointelegraph.com/storage/uploads/view/f90d3fbc91f706a937b53ce93894b6d3.png"} alt={item?.investment_name?.name} style={{ width: "11vw", height: "11vw", objectFit: "cover" }} />
                                                <div>
                                                    <h2 style={{ fontSize: "4vw", fontWeight: 600 }}>{item?.investment_name?.name}</h2>
                                                    <span style={{ color: "#a8a8a8", fontSize: "3.7vw" }}>{formatDateTime(item?.invesAt)}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h2 style={{ fontSize: "4vw", fontWeight: 700 }}>{`$${item?.payment}`}</h2>
                                                <span style={{ color: "#21c8d7", fontSize: "3vw" }}>{item?.status}</span>
                                            </div>
                                        </div>
                                    )
                                ))
                            ) : (
                                <p style={{ color: "white" }}>No data found</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CurrentInvest;