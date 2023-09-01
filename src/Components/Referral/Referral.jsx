import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import fetchAllReferral from '../../helpers/getApis/getReferral'

function Referral() {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    const userId = userDetails?.data?._id;

    const [allReferral, setAllReferral] = useState([]);
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

    console.log(allReferral, "a")
    return (
        <>
            <div className="padding-top"></div>
            <div>
                <h1 className="h1-deposit">
                    Referral
                </h1 >
                <div>
                    {error && <div
                        style={{
                            color: "white",
                            textAlign: "center"
                        }}
                    >{error}
                        <br />
                        No Referral Found
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Referral
