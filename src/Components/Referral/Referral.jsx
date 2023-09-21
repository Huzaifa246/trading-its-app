import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import fetchAllReferral from '../../helpers/getApis/getReferral'

function Referral() {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    const userId = userDetails?.data?._id;

    // const defaultProfiles = [
    //     {
    //         name: 'Huzaifa',
    //         email: 'huzaifa@example.com',
    //         amount: '11$',
    //         ref: '1',
    //         subProfiles: [
    //             {
    //                 name: 'Ali',
    //                 email: 'ali@example.com',
    //                 amount: '11$',
    //                 ref: '1',
    //                 subsubProf: [
    //                     {
    //                         name: 'Hamza',
    //                         email: 'hamza@example.com',
    //                         amount: '11$',
    //                         ref: '1',
    //                     }
    //                 ]
    //             },
    //             {
    //                 name: 'Hamza',
    //                 email: 'hamza@example.com',
    //                 amount: '11$',
    //                 ref: '1',
    //             },
    //         ],
    //     },
    //     {
    //         name: 'John',
    //         email: 'john@example.com',
    //         amount: '99$',
    //         ref: '2',
    //         subProfiles: [
    //             {
    //                 name: 'Emma Watson',
    //                 email: 'emma@example.com',
    //                 amount: '77$',
    //                 ref: '1',
    //                 subsubProf: [
    //                     {
    //                         name: 'Safi',
    //                         email: 'Safi@example.com',
    //                         amount: '11$',
    //                         ref: '9',
    //                     },
    //                     {
    //                         name: 'Smith',
    //                         email: 'smith@example.com',
    //                         amount: '66$',
    //                         ref: '1',
    //                     }
    //                 ]
    //             },
    //             {
    //                 name: 'Smith',
    //                 email: 'smith@example.com',
    //                 amount: '66$',
    //                 ref: '1',
    //             },
    //         ],
    //     },
    //     {
    //         name: 'Qasim',
    //         email: 'Qasim@example.com',
    //         amount: '26$',
    //         ref: '1',
    //         subProfiles: [
    //             {
    //                 name: 'Abdul',
    //                 email: 'Abdul@example.com',
    //                 amount: '36$',
    //                 ref: '1',
    //             },
    //         ],
    //     },
    //     {
    //         name: 'TOV',
    //         email: 'TOV@example.com',
    //         amount: '6$',
    //         ref: '0',
    //         subProfiles: [
    //             {
    //                 name: 'Hamza',
    //                 email: 'hamza@example.com',
    //                 amount: '2$',
    //                 ref: '0',
    //             },
    //         ],
    //     },
    // ];
    const [allReferral, setAllReferral] = useState([]);
    const [activeProfile, setActiveProfile] = useState(null);
    const [error, setError] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const decryptedData = await fetchAllReferral(userId);
                setAllReferral(decryptedData.data.referralOne);
            } catch (error) {
                console.error(error.message);
                setError(error.message);
            }
        }
        fetchData();
    }, [userId]);

    const handleClickProfile = (profile) => {
        // Check if the profile has subProfiles
        // if (profile.subProfiles.length > 0) {
        //     setAllReferral((prevData) =>
        //         prevData.map((p) => ({
        //             ...p,
        //             showSubProfiles: p === profile ? !p.showSubProfiles : false,
        //         }))
        //     );
        // } else if (profile.subsubProf?.length > 0) {
        //     setActiveProfile(activeProfile === profile ? null : profile);
        // }
        setActiveProfile(activeProfile === profile ? null : profile);
    };
    console.log("allReferral:", allReferral);
    return (
        <>
            <div className="padding-top"></div>
            <div>
                <h1 className="h1-deposit">Referral</h1>
                <div style={{ color: 'white' }}>
                    {allReferral.length === 0 ? (
                        <p style={{textAlign: 'center'}}>No Referral Found!!!</p>
                    ) : (
                        <div className="profile-list">
                            {allReferral?.map((profile, index) => (
                                <div key={index}>
                                    <div
                                        className={`profile-item ${activeProfile === profile ? 'active' : ''}`}
                                        onClick={() => handleClickProfile(profile)}
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: 'white',
                                                gap: '1rem',
                                                justifyContent: 'space-between',
                                                margin: '1rem',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem',
                                                }}
                                            >
                                                <img
                                                    src={'https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png'}
                                                    alt={'profile'}
                                                    style={{
                                                        width: '11vw',
                                                        height: '11vw',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                                <span style={{ fontSize: '3vh' }}>{profile?.fullName}</span>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'end',
                                                }}
                                            >
                                                <h2 style={{ fontSize: '3vw', fontWeight: 700 }}>
                                                    {profile?.parent1?.commission}
                                                </h2>
                                                <p style={{ color: '#21c8d7', fontSize: '3vw' }}>
                                                    {profile?.parent1?.user}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Referral;