import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import fetchAllReferral from '../../helpers/getApis/getReferral'

function Referral() {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    const userId = userDetails?.data?._id;

    const defaultProfiles = [
        {
            name: 'Huzaifa',
            email: 'huzaifa@example.com',
            subProfiles: [
                {
                    name: 'Ali',
                    email: 'ali@example.com',
                },
                {
                    name: 'Hamza',
                    email: 'hamza@example.com',
                },
            ],
        },
        {
            name: 'John',
            email: 'john@example.com',
            subProfiles: [
                {
                    name: 'Emma',
                    email: 'emma@example.com',
                },
                {
                    name: 'Smith',
                    email: 'smith@example.com',
                },
            ],
        },
    ];
    const [allReferral, setAllReferral] = useState(defaultProfiles);
    const [activeProfile, setActiveProfile] = useState(null);
    const [error, setError] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const decryptedData = await fetchAllReferral(userId);
                setAllReferral(decryptedData.data);
            } catch (error) {
                console.error(error.message);
                setError(error.message);
            }
        }
        fetchData();
    }, [userId]);

    const handleClickProfile = (profile) => {
        setAllReferral((prevData) =>
            prevData.map((p) => ({
                ...p,
                showSubProfiles: p === profile ? !p.showSubProfiles : false,
            }))
        );
    };

    return (
        <>
            <div className="padding-top"></div>
            <div>
                <h1 className="h1-deposit">
                    Referral
                </h1>
                <div style={{ color: 'white' }}>
                    <div className="profile-list">
                        {allReferral.map((profile, index) => (
                            <div
                                key={index}
                                className={`profile-item ${profile === activeProfile ? 'active' : ''
                                    }`}
                                onClick={() => handleClickProfile(profile)}
                            >
                                {profile.name}
                                {profile.showSubProfiles && (
                                    <ul>
                                        {profile.subProfiles.map((subProfile, subIndex) => (
                                            <li key={subIndex}>
                                                <h4>{subProfile.name}</h4>
                                                <p>Email: {subProfile.email}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Referral
