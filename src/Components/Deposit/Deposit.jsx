import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DepositInvestment from '../../helpers/PostApis/DepositInvestment';
import { useSelector } from 'react-redux';
import './Deposit.css';

function Deposit() {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    const userId = userDetails?.data?._id;

    const [showDepositModal, setShowDepositModal] = useState(false);
    const [depositResponse, setDepositResponse] = useState(null);
    const [depositText, setDepositText] = useState('');
    const [rangeValue, setRangeValue] = useState(50.00); // Initial value is set to 50.00
    const [editableValue, setEditableValue] = useState(rangeValue.toFixed(2));  // Initial value is set to 50
    const [isError, setIsError] = useState(false); // Flag to track if there's an error
    const [isDepositDisabled, setIsDepositDisabled] = useState(false);

    const handleShowDepositModal = () => {
        setShowDepositModal(true);
    };

    const handleCloseDepositModal = () => {
        setShowDepositModal(false);
    };

    const handleDeposit = async () => {
        try {
            const formattedRangeValue = rangeValue.toFixed(2);
            const response = await DepositInvestment(userId, formattedRangeValue.toString());
            setDepositResponse(response);
            setDepositText('Deposit successful.');
            window.location.reload();
        } catch (error) {
            console.error('Error making deposit:', error);
        } finally {
            setShowDepositModal(false);
        }
    };

    // Function to handle changes in the range input
    const handleRangeChange = (e) => {
        const newValue = parseFloat(e.target.value);
        setRangeValue(newValue);
        setEditableValue(newValue.toFixed(2));
        setIsError(newValue < 50 || newValue > 500);
        setIsDepositDisabled(newValue < 50 || newValue > 500);
    };
    const handleEditableValueChange = (e) => {
        const newValue = parseFloat(e.target.value);
        if (!isNaN(newValue) && newValue >= 50 && newValue <= 500) {
            setRangeValue(newValue);
            setIsError(false);
        } else if (newValue < 50) {
            setIsError(true);
        } else if (newValue > 500) {
            setIsError(true);
        }
        setEditableValue(e.target.value);
        setIsDepositDisabled(newValue < 50 || newValue > 500); // Disable the deposit button if the value is less than 50
    };
    return (
        <>
            <Modal show={showDepositModal} onHide={handleCloseDepositModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Deposit Amount</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to deposit amount : <b>{rangeValue} </b></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDepositModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeposit}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="padding-top"></div>
            <div className="Main-deposit">
                <div>
                    <h1 className="h1-deposit">Add Funds</h1>
                    <div>
                        <div className="range-value">
                            <input
                                type="number"
                                className={`form-control deposit-input-style ${isError ? 'is-invalid' : ''}`}
                                value={editableValue}
                                onChange={handleEditableValueChange}
                                min="50"
                                max={500}
                            // step={0.01}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    {isError && (
                        <div className="invalid-feedback">
                            Value must be between 50 and 500.
                        </div>
                    )}
                </div>
                <div>
                    <div className="main-fm-deposit">
                        <form className="fm-style-deposit">
                            <div className='deposit-range'>
                                <h6>
                                    50
                                </h6>
                                <h6>
                                    500
                                </h6>
                            </div>
                            <div className="form-group">
                                <input
                                    type="range"
                                    className="form-range range-style"
                                    id="customRange1"
                                    min={50.0}
                                    max={500}
                                    step={0.01}
                                    value={rangeValue}
                                    onChange={handleRangeChange}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="button-style">
                        <button onClick={handleShowDepositModal} className="Depositbtn"
                            disabled={isDepositDisabled}>
                            Deposit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Deposit;
