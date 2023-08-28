import React, { useState, useEffect } from 'react'
import WithDrawAll from './../../../helpers/WithDrawApi/WdAllGet';
import { useSelector } from "react-redux";
import { formatDateTime } from '../../../helpers/DataFormat/DateFormat';
import './myWithDraw.css';
import { Modal, Button } from 'react-bootstrap';
import WdPostCancelUser from '../../../helpers/WithDrawApi/WdPostCancelUser';

function MyWithDraw() {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    const userId = userDetails?.data?._id;
    const [withDrawData, setWithDrawData] = useState([]);
    const [status, setStatus] = useState('');
    const [activeStatus, setActiveStatus] = useState('');

    // State for withdrawal cancellation confirmation
    const [cancellationModalOpen, setCancellationModalOpen] = useState(false);
    const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await WithDrawAll(userId, status); // Pass the selected status
                setWithDrawData(response.data);
            } catch (error) {
                console.error("Error fetching investment data:", error);
            }
        }
        fetchData();
    }, [userId, status]); // Include status in the dependency array

    // Function to handle button clicks and set the status
    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setActiveStatus(newStatus);
    };

    const handleCancelClick = (withdrawal) => {
        setSelectedWithdrawal(withdrawal);
        setCancellationModalOpen(true);
    };

    const handleConfirmCancel = async () => {
        let amount = selectedWithdrawal?.amount;
        let withDrawId = selectedWithdrawal?._id;
        let cancellation = true;

        try {
            const response = await WdPostCancelUser(userId, amount, cancellation, withDrawId);
            setWithDrawData(response.data);
            console.log(response, "asd")
        } catch (error) {
            console.error("Error making API call:", error);
        }
        setCancellationModalOpen(false);
        window.location.reload();
    };


    return (
        <>
            <Modal show={cancellationModalOpen} onHide={() => setCancellationModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Cancel Withdrawal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to cancel this withdrawal of ${selectedWithdrawal?.amount?.toFixed(2)}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setCancellationModalOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleConfirmCancel}>Confirm</Button>
                </Modal.Footer>
            </Modal>
            <div>
                <div className='my-wd-main'>
                    <button className={`my-wd-btn ${activeStatus === '' ? 'active' : ''}`} onClick={() => handleStatusChange('')}>ALL Data</button>
                    <button className={`my-wd-btn ${activeStatus === 'pending' ? 'active' : ''}`} onClick={() => handleStatusChange('pending')}>Pending</button>
                    <button className={`my-wd-btn ${activeStatus === 'approved' ? 'active' : ''}`} onClick={() => handleStatusChange('approved')}>Approved</button>
                    <button className={`my-wd-btn ${activeStatus === 'declined' ? 'active' : ''}`} onClick={() => handleStatusChange('declined')}>Decline</button>
                    <button className={`my-wd-btn ${activeStatus === 'canceled' ? 'active' : ''}`} onClick={() => handleStatusChange('canceled')}>Canceled</button>
                </div>
                <div className='wd-list'>
                    {withDrawData?.map((item) => (
                        <div
                            key={item._id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: 'white',
                                gap: '1rem',
                                marginBottom: '1rem',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img
                                    src="https://s3.cointelegraph.com/storage/uploads/view/f90d3fbc91f706a937b53ce93894b6d3.png"
                                    alt={item?.binance_id || "Add Id"}
                                    style={{ width: '11vw', height: '11vw', objectFit: 'cover' }}
                                />
                                <div>
                                    <h2 style={{ fontSize: '4vw', fontWeight: 600 }}>
                                        {item?.amount?.toFixed(2)}
                                    </h2>
                                    <span style={{ color: '#a8a8a8', fontSize: '3.7vw' }}>
                                        {formatDateTime(item?.createdAt)}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h2 style={{ fontSize: '4vw', fontWeight: 700 }}>{`${item?.binance_id || "Add Id"}`}</h2>
                                <span style={{
                                    color: '#21c8d7', fontSize: '3vw', display: "flex",
                                    justifyContent: "flex-end"
                                }}>
                                    {item?.status === "pending" ? (
                                        <button className='cancel-wd-btn'
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end"
                                            }}
                                            onClick={() => handleCancelClick(item)}>Cancel</button>
                                    ) : (
                                        <span style={{
                                            display: "flex",
                                            justifyContent: "flex-end"
                                        }}>{item?.status}</span>
                                    )}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </>
    )
}

export default MyWithDraw
