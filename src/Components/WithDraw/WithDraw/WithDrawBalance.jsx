import React, { useState } from 'react';
import { Button, Modal, Toast } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './withdraw.css';
import WdPostByUser from './../../../helpers/WithDrawApi/WdPostByUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WithDrawBalance() {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    const userId = userDetails?.data?._id;
    const idOfSender = userDetails?.data?.binance_id;
    const withDraw = userDetails?.data?.withdrawable;

    const [showDepositModal, setShowDepositModal] = useState(false);
    const [withDrawResponse, setWithDrawResponse] = useState(null);
    const [withDrawText, setWithDrawText] = useState('');
    const [rangeValue, setRangeValue] = useState(withDraw); // Initial value is set to 50.00
    const [editableValue, setEditableValue] = useState(rangeValue?.toFixed(2));  // Initial value is set to 50
    const [isError, setIsError] = useState(false); // Flag to track if there's an error
    const [isDepositDisabled, setIsDepositDisabled] = useState(true);

    const [isApiCallInProgress, setIsApiCallInProgress] = useState(false);

    const handleShowDepositModal = () => {
        setShowDepositModal(true);
    };

    const handleCloseDepositModal = () => {
        setShowDepositModal(false);
    };

    const handleWithDraw = async () => {
        try {
            if (isApiCallInProgress) {
                return; // Don't allow multiple API calls
            }

            setIsApiCallInProgress(true);

            if (idOfSender !== "" && idOfSender !== null) {
                const formattedRangeValue = rangeValue?.toFixed(2);
                const response = await WdPostByUser(userId, formattedRangeValue.toString(), idOfSender);
                setWithDrawResponse(response);
                setWithDrawText('withDraw successful.');
                window.location.reload();
            }
            else {
                toast.error("Please provide a valid sender ID. Enter your binance ID in Profile.", {
                    position: "top-center",
                });
            }
        } catch (error) {
            console.error('Error making withDraw:', error);
        } finally {
            setShowDepositModal(false);
            setIsApiCallInProgress(false);
        }
    };

    // Function to handle changes in the range input
    const handleRangeChange = (e) => {
        const newValue = parseFloat(e.target.value);
        setRangeValue(newValue);
        setEditableValue(newValue.toFixed(2));
        setIsError(newValue < 0 || newValue > withDraw);
        // setIsDepositDisabled(newValue < 0 || newValue > withDraw);
        setIsDepositDisabled(newValue === 0 || newValue < 0 || newValue > withDraw);
    };
    const handleEditableValueChange = (e) => {
        const newValue = parseFloat(e.target.value);
        if (!isNaN(newValue) && newValue >= 0 && newValue <= withDraw) {
            // Ensure exactly 2 decimal places
            const roundedValue = parseFloat(newValue?.toFixed(2));
            if (roundedValue === newValue) {
                setRangeValue(newValue);
                setIsError(false);
            } else {
                setIsError(true);
            }
        } else {
            setIsError(true);
        }
        setEditableValue(e.target.value);
        // setIsDepositDisabled(isNaN(newValue) || newValue <= 0 || newValue > withDraw);
        setIsDepositDisabled(newValue === 0 || isNaN(newValue) || newValue <= 0 || newValue > withDraw);
    };

    return (
        <>
            <ToastContainer />
            <Modal show={showDepositModal} onHide={handleCloseDepositModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>With Draw Amount</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to with Draw amount : <b>{rangeValue} </b></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDepositModal}>
                        Close
                    </Button>
                    <Button variant="primary"
                        onClick={handleWithDraw}
                        disabled={isApiCallInProgress}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="Main-wdraw">
                <div>
                    <h1 className="h1-wdraw">Withdrawal</h1>
                    <div>
                        <div className="range-value">
                            <input
                                type="number"
                                className={`form-control wdraw-input-style ${isError ? 'is-invalid' : ''}`}
                                value={editableValue}
                                onChange={handleEditableValueChange}
                                min="0"
                                max={withDraw}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    {isError && (
                        <div className="invalid-feedback">
                            Value must be between 0 and {withDraw}.
                        </div>
                    )}
                </div>
                <div>
                    <div className="main-fm-wdraw">
                        <form className="fm-style-wdraw">
                            <div className='wdraw-range'>
                                <h6>
                                    0
                                </h6>
                                <h6>
                                    {withDraw?.toFixed(2)}
                                </h6>
                            </div>
                            <div className="form-group">
                                <input
                                    type="range"
                                    className="form-range range-style"
                                    id="customRange1"
                                    min={0.0}
                                    max={withDraw}
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
                            With Draw
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WithDrawBalance;
