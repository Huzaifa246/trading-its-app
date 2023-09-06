import React, { useState, useEffect } from 'react';
import './mainTable.css';
import fetchAllTradeOption from '../../../helpers/getApis/getAllOptions';
import InvestmentByUser from '../../../helpers/PostApis/investmentByUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";
import { Modal, Button } from 'react-bootstrap';

function StatisticTable({ optionId }) {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    const userId = userDetails?.data?._id;
    const totalBalance = userDetails?.data?.totalbalance + userDetails?.data?.withdrawable; 

    const [tradeOptions, setTradeOptions] = useState([]);
    const [investmentResponse, setInvestmentResponse] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isError, setIsError] = useState(false);
    const [rangeValue, setRangeValue] = useState('');

    const [isApiCallInProgress, setIsApiCallInProgress] = useState(false);

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
            if (isApiCallInProgress) {
                return; // Don't allow multiple API calls
            }
            setIsApiCallInProgress(true);

            const investmentResponse = await InvestmentByUser(userId, investmentValue, optionId);
            setInvestmentResponse(investmentResponse);
            if (investmentResponse.success) {
                setShowSuccessModal(true);
            }
        } catch (error) {
            console.error('Error making investment:', error);
        } finally {
            setShowConfirmationModal(false);
            setIsApiCallInProgress(false)
        }
    };
    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        window.location.reload();
    }


    const depositValue = totalBalance - rangeValue;
    const investmentValue = rangeValue;

    const handleRangeChange = (event) => {
        const newValue = parseFloat(event.target.value);
        setIsError(newValue <= 0 || newValue > totalBalance);
        setRangeValue(newValue);
    };
    const getRangeColor = (value) => {
        return value >= totalBalance / 2 ? '#2fd3c9' : '#5c768b';
    };

    return (
        <>
            <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} centered>
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
                    <Button variant="primary" onClick={confirmInvestment}
                        disabled={isApiCallInProgress}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showSuccessModal} onHide={handleSuccessModalClose} centered>
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
            <div className='Main-invest-style'>
                <div style={{
                    padding: ".5rem 1rem"
                }}>
                </div>
                <div>
                    <h3 className="h1-deposit" style={{
                        marginTop: "40px"
                    }}>Add Investment</h3>
                    <div>
                        <div className="range-value">
                            <input
                                type="number"
                                className={`form-control Invest-input ${isError ? 'is-invalid' : ''}`}
                                id="customRange1"
                                min="0.00"
                                max={totalBalance}
                                value={rangeValue}
                                onChange={handleRangeChange}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    {isError && (
                        <div className="invalid-feedback">
                            Value must be between 0 and {totalBalance}
                        </div>
                    )}
                </div>
                <div style={{ position: 'sticky', width: '100%', padding: '20px 15px' }}>
                    <div className='range-main-style'>
                        <h6 className='range-head'>HOLDER ACTIVITY</h6>
                        <input
                            type="range"
                            className="form-range range-style"
                            id="customRange1"
                            min="0"
                            step={0.01}
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
                            {depositValue?.toFixed(2)} deposit
                        </h6>
                        <h6 className={`range-head ${investmentValue >= totalBalance / 2 ? 'buy-percentage-blue' : ''}`}>
                            {investmentValue} investment
                        </h6>
                    </div>
                    <div style={{ padding: "0 10px" }}>
                        <div className='button-style'>
                            <button onClick={handleInvestment}
                                className={`buy-btn ${investmentValue <= 0 || investmentValue > totalBalance ? 'disabled-button' : ''}`}
                                disabled={investmentValue <= 0 || investmentValue > totalBalance || isError}
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
