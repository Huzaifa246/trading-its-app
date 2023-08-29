import React, { useState, useEffect } from 'react';
import './mainTable.css';
import fetchAllTradeOption from '../../../helpers/getApis/getAllOptions';
import InvestmentByUser from '../../../helpers/PostApis/investmentByUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";
import { Modal, Button } from 'react-bootstrap';

function StatisticTable({ optionId }) {
    // const [showDepositModal, setShowDepositModal] = useState(false);
    // const [depositAmount, setDepositAmount] = useState('');
    // const [depositResponse, setDepositResponse] = useState(null);

    const [tradeOptions, setTradeOptions] = useState([]);
    const [investmentResponse, setInvestmentResponse] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    const userId = userDetails?.data?._id;
    const totalBalance = userDetails?.data?.totalbalance + userDetails?.data?.withdrawable;

    useEffect(() => {
        async function fetchData() {
            const decryptedData = await fetchAllTradeOption();
            setTradeOptions(decryptedData?.data);
        }
        fetchData();
    }, []);

    const handleInvestment = () => {
        setShowConfirmationModal(true);
    };
    const confirmInvestment = async () => {
        try {
            const investmentResponse = await InvestmentByUser(userId, investmentValue, optionId);
            setInvestmentResponse(investmentResponse);
            if (investmentResponse.success) {
                setShowSuccessModal(true);
            }
        } catch (error) {
            console.error('Error making investment:', error);
        } finally {
            setShowConfirmationModal(false);
        }
    };
    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        window.location.reload();
    }
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
    const [rangeValue, setRangeValue] = useState(0);


    const depositValue = totalBalance - rangeValue;
    const investmentValue = rangeValue;

    const handleRangeChange = (event) => {
        const newValue = event.target.value;
        setRangeValue(newValue);
    };
    const getRangeColor = (value) => {
        return value >= totalBalance / 2 ? '#2fd3c9' : '#5c768b';
    };

    return (
        <>
            <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm your investment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Confirm your investment of {investmentValue}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmInvestment}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Investment Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Your investment was successful!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSuccessModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
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
                <div style={{ position: 'sticky', width: '100%', padding: '20px 15px' }}>
                    <div className='range-main-style'>
                        <h6 className='range-head'>HOLDER ACTIVITY</h6>
                        <input
                            type="range"
                            className="form-range range-style"
                            id="customRange1"
                            min="0"
                            max={totalBalance}
                            value={rangeValue}
                            onChange={handleRangeChange}
                            style={{
                                '--range-color': getRangeColor(rangeValue),
                                background: `linear-gradient(to right, #5c768b ${investmentValue / totalBalance * 100}%, #2fd3c9 0)`,
                            }}
                        />
                    </div>
                    <div className='sell-buy-main'>
                        <h6 className={`range-head ${depositValue >= totalBalance / 2 ? 'sell-percentage-grey' : ''}`}>
                            {depositValue} deposit
                        </h6>
                        <h6 className={`range-head ${investmentValue >= totalBalance / 2 ? 'buy-percentage-blue' : ''}`}>
                            {investmentValue} investment
                        </h6>
                    </div>
                    <div style={{ padding: "0 10px" }}>
                        <div className='button-style'>
                            <button onClick={handleInvestment} 
                             className={`buy-btn ${investmentValue === 0 ? 'disabled-button' : ''}`}
                             disabled={investmentValue === 0}
                            >
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
