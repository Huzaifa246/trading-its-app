import React, { useState, useEffect } from 'react'
import WithDrawAll from './../../../helpers/WithDrawApi/WdAllGet';
import { useSelector } from "react-redux";
import { formatDateTime } from '../../../helpers/DataFormat/DateFormat';
import './myWithDraw.css';
function MyWithDraw() {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    const userId = userDetails?.data?._id;
    const [withDrawData, setWithDrawData] = useState([]);
    const [status, setStatus] = useState('');
    const [activeStatus, setActiveStatus] = useState('');

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
    return (
        <>
            <div>
                <div className='my-wd-main'>
                    <button className={`my-wd-btn ${activeStatus === '' ? 'active' : ''}`} onClick={() => handleStatusChange('')}>ALL Data</button>
                    <button className={`my-wd-btn ${activeStatus === 'pending' ? 'active' : ''}`} onClick={() => handleStatusChange('pending')}>Pending</button>
                    <button className={`my-wd-btn ${activeStatus === 'approved' ? 'active' : ''}`} onClick={() => handleStatusChange('approved')}>Approved</button>
                    <button className={`my-wd-btn ${activeStatus === 'declined' ? 'active' : ''}`} onClick={() => handleStatusChange('declined')}>Decline</button>
                    <button className={`my-wd-btn ${activeStatus === 'canceled' ? 'active' : ''}`} onClick={() => handleStatusChange('canceled')}>Canceled</button>
                </div>
                <div>
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
                                        {item?.status}
                                    </h2>
                                    <span style={{ color: '#a8a8a8', fontSize: '3.7vw' }}>
                                        {formatDateTime(item?.createdAt)}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h2 style={{ fontSize: '4vw', fontWeight: 700 }}>{`${item?.binance_id || "Add Id"}`}</h2>
                                <span style={{ color: '#21c8d7', fontSize: '3vw' }}>
                                    {item?.amount?.toFixed(2)}
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
