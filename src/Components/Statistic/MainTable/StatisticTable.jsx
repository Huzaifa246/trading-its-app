import React, { useState } from 'react';
import './mainTable.css';
import { savedDataString } from '../../../helpers/UserDetails/UserDetails';

function StatisticTable() {
    const savedDataProfile = JSON.parse(savedDataString);
    const userId = savedDataProfile?.data?._id;
    console.log(userId, "userID")
    const data = [
        {
            id: 1,
            name: "Binance coin",
            abbr: "BNB",
            icon: "https://s3.cointelegraph.com/storage/uploads/view/f90d3fbc91f706a937b53ce93894b6d3.png",
            value: "$363.23",
            increment: "+5.67%"
        }
    ]
    const [rangeValue, setRangeValue] = useState(50);

    const handleInvestment = () => {
        console.log("Buy button clicked");
    };

    const sellPercentage = 100 - rangeValue;
    const buyPercentage = rangeValue;

    const handleRangeChange = (event) => {
        const newValue = event.target.value;
        setRangeValue(newValue);
    };
    const getRangeColor = (value) => {
        return value >= 50 ? '#2fd3c9' : '#5c768b';
    };



    return (
        <>
            <div>
                <div style={{
                    padding: ".5rem 1rem .5rem"
                }}>
                    <div style={{
                        padding: ".5rem",
                    }}>
                        {data?.map(item => (
                            <div key={item.id} style={{
                                display: "flex",
                                alignItems: "center",
                                color: "white",
                                gap: "1rem",
                                marginBottom: "1rem",
                                justifyContent: "space-between"
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                    {/* <img src={item?.icon} alt={item?.name} style={{ width: "11vw", height: "11vw", objectFit: "cover" }} /> */}
                                    <div>
                                        <h1 style={{ fontSize: "4.5vw", fontWeight: 600, color: "#515c6c" }}>Price Index</h1>
                                        <h2 style={{ fontSize: "4vw", fontWeight: 600 }}>{item?.name}</h2>
                                        <span style={{ color: "#a8a8a8", fontSize: "3.7vw" }}>{item?.value}</span>
                                    </div>
                                </div>
                                <div>
                                    <h1 style={{ fontSize: "4.5vw", fontWeight: 600, color: "#515c6c" }}>Market Cap</h1>
                                    <h2 style={{ fontSize: "4vw", fontWeight: 700 }}>{`$${item?.value}`}</h2>
                                    <span style={{ color: "#21c8d7", fontSize: "3vw" }}>{item?.increment}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="state-change-container">
                    <div className="state-changeFrst">
                        <h6 className='state-h6-head'> Daily Change</h6>
                        <h6 className='state-updown'>4.86%</h6>
                    </div>
                    <div className="state-changeSec">
                        <h6 className='state-h6-head'> High Price</h6>
                        <h6 className="state-h6-2nd">$7999.00</h6>
                    </div>
                    <div className='state-changeThrd'>
                        <h6 className='state-h6-head'> Low Price</h6>
                        <h6 className="state-h6-2nd">$8754.00</h6>
                    </div>
                </div>
                <div style={{ position: 'sticky', width: '100%', padding: '20px 15px', margin: "10px" }}>
                    <div className='range-main-style'>
                        <h6 className='range-head'>HOLDER ACTIVITY</h6>
                        <input
                            type="range"
                            className="form-range range-style"
                            id="customRange1"
                            value={rangeValue}
                            onChange={handleRangeChange}
                            style={{ '--range-color': getRangeColor(rangeValue) }}
                        />
                    </div>
                    <div className='sell-buy-main'>
                        <h6 className={`range-head ${sellPercentage >= 50 ? 'sell-percentage-grey' : ''}`}>
                            {sellPercentage}% deposit
                        </h6>
                        <h6 className={`range-head ${buyPercentage >= 50 ? 'buy-percentage-blue' : ''}`}>
                            {buyPercentage}% investment
                        </h6>
                    </div>
                    <div style={{ margin: "10px" }}>
                        <div className='button-style'>
                            <button onClick={handleInvestment} className='buy-btn'>
                                Invest
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StatisticTable;
