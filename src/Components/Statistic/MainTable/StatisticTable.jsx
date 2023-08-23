import React, { useState, useEffect } from 'react';
import './mainTable.css';
import fetchAllTradeOption from '../../../helpers/getApis/getAllOptions';
import InvestmentByUser from '../../../helpers/PostApis/investmentByUser';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import DepositInvestment from '../../../helpers/PostApis/DepositInvestment';
import { useSelector } from "react-redux";

function StatisticTable({ optionId }) {
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [depositAmount, setDepositAmount] = useState('');
    const [depositResponse, setDepositResponse] = useState(null);

    const [tradeOptions, setTradeOptions] = useState([]);
    const [investmentResponse, setInvestmentResponse] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);


    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    const userId = userDetails?.data?._id;
    const totalBalance = userDetails?.data?.totalbalance;

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

            window.location.reload();
        } catch (error) {
            console.error('Error making investment:', error);
        } finally {
            setShowConfirmationModal(false);
        }
    };
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

    const handleShowDepositModal = () => {
        setShowDepositModal(true);
    };

    const handleCloseDepositModal = () => {
        setShowDepositModal(false);
    };

    const handleDeposit = async () => {
        try {
            if (depositAmount <= 0) {
                // Display an error message or handle it in any way you prefer
                console.error('Deposit amount must be greater than zero.');
                return; // Exit the function without making the deposit
            }
            const response = await DepositInvestment(userId, depositAmount);
            setDepositResponse(response);
            window.location.reload(); // Refresh the page or update UI as needed
        } catch (error) {
            console.error('Error making deposit:', error);
        } finally {
            setShowDepositModal(false); // Close the deposit modal
        }
    };



    return (
        <>
            <Modal show={showDepositModal} onHide={handleCloseDepositModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Deposit Funds</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="depositAmount">Deposit Amount:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="depositAmount"
                                value={depositAmount}
                                // onChange={(e) => setDepositAmount(e.target.value)}
                                onChange={(e) => setDepositAmount(e.target.value)}
                                min={0}
                                onKeyPress={(event) => {
                                    if (event.charCode < 48) {
                                        event.preventDefault();
                                    }
                                }}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDepositModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeposit}>
                        Deposit
                    </Button>
                </Modal.Footer>
            </Modal>

            {showConfirmationModal && (
                <div className="modal-overlay">
                    <div className="confirmation-modal">
                        <p>Confirm your investment of {investmentValue}?</p>
                        <div className="modal-buttons">
                            <button onClick={confirmInvestment} className="modal-confirm-btn">
                                Confirm
                            </button>
                            <button onClick={() => setShowConfirmationModal(false)} className="modal-cancel-btn">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
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
                    <div style={{ margin: "10px" }}>
                        <div className='button-style'>
                            <button onClick={handleInvestment} className='buy-btn'>
                                Invest
                            </button>
                        </div>
                        <div className='button-style'>
                            <button
                                // onClick={handleDeposit} 
                                onClick={handleShowDepositModal} className='buy-btn'>
                                Deposit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StatisticTable;
