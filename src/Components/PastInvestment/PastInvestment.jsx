import React, { useState, useEffect, useRef } from 'react';
import styles from "./index.module.css";
import { formatDateTime } from '../../helpers/DataFormat/DateFormat';
import FixedBar from '../FixedBar';
import fetchAllTradeOption from '../../helpers/getApis/getAllOptions';
import { savedDataString } from '../../helpers/UserDetails/UserDetails';
import fetchAllInvestment from '../../helpers/getApis/getAllinvestment';


const PastInvestment = () => {
    const fixedBarRef = useRef(null);
    const savedDataProfile = JSON.parse(savedDataString);
    const userId = savedDataProfile?.data?._id;

    const [tradeOptions, setTradeOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [investmentData, setInvestmentData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const decryptedData = await fetchAllTradeOption();
            setTradeOptions(decryptedData.data);
            // console.log(decryptedData.data, "Trade Options");
            fetchInvestmentData();
        }
        fetchData();
    }, []);

    const fetchInvestmentData = async () => {
        // setSelectedOption(selectedOptionId);
        try {
            const investtype = 'past';
            const response = await fetchAllInvestment(userId, investtype);
            console.log(response.data, "Investment Data");
            if (response.data) {
                setInvestmentData(response.data);
            }
        } catch (error) {
            console.error("Error fetching investment data:", error);
        }
    };
    const handleOptionClick = (optionId) => {
        setSelectedOption(optionId);
        fetchInvestmentData(optionId);
    };

    return (
        <>
            <div className={styles.container}>
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
                <div style={{ padding: ".5rem" }}>
                    {investmentData?.length > 0 ? (
                        investmentData.map(item => (
                            (selectedOption === "" || item.investment_name._id === selectedOption) && (
                                <div
                                    key={item._id}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "white",
                                        gap: "1rem",
                                        marginBottom: "1rem",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                        <img
                                            src={"https://s3.cointelegraph.com/storage/uploads/view/f90d3fbc91f706a937b53ce93894b6d3.png"}
                                            alt={item?.investment_name?.name}
                                            style={{ width: "11vw", height: "11vw", objectFit: "cover" }}
                                        />
                                        <div>
                                            <h2 style={{ fontSize: "4vw", fontWeight: 600 }}>
                                                {item?.investment_name?.name}
                                            </h2>
                                            <span style={{ color: "#a8a8a8", fontSize: "3.7vw" }}>
                                                {formatDateTime(item?.invesAt)}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 style={{ fontSize: "4vw", fontWeight: 700 }}>{`$${item?.payment}`}</h2>
                                        <span style={{ color: "#21c8d7", fontSize: "3vw" }}>
                                            {item?.profitPercentage.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            )
                        ))
                    ) : (
                        <p style={{ color: "white" }}>No data found</p>
                    )}
                </div>

            </div>
            <FixedBar fixedBarRef={fixedBarRef} />
        </>
    )
}

export default PastInvestment;