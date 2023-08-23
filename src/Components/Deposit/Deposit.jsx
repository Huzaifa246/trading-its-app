import React, { useState } from 'react'

function Deposit() {
    const [depositAmount, setDepositAmount] = useState('');
    const [depositResponse, setDepositResponse] = useState(null);
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

        </>
    )
}

export default Deposit
