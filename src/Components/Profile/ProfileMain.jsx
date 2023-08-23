import React from 'react'
import { useSelector } from "react-redux";
import "./ProfileMain.css";
import { Button } from 'react-bootstrap';
import DeleteUserImage from '../../helpers/PostApis/DeleteImage';

function ProfileMain() {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    const userId = userDetails?.data?._id;
    const fullName = userDetails?.data?.fullName;
    const email = userDetails?.data?.email;
    const userImg = userDetails?.data?.profile_image?.url

    const handleConfirmDelete = async (userId) => {
        // setDelModalShow(false);

        try {
            // setIsLoading(true);
            await DeleteUserImage(userId);
            setUsers(users.filter(user => user?._id !== userId));
            // setIsLoading(false);
        } catch (error) {
            console.error('Error deleting user Image:', error);
            // setIsLoading(false);
        }
    };

    return (
        <>
            <div className="page-content page-container" id="page-content">
                <div className="row container d-flex justify-content-center" style={{ margin: "20px 0" }}>
                    <div className="col-xl-6 col-md-12">
                        <div className="card user-card-full">
                            <div className="row m-l-0 m-r-0">
                                <div className="col-sm-12 bg-left-grad user-profile">
                                    <div className="card-block text-center text-white">
                                        <div className="m-b-25">
                                            <img src={userImg} className="img-radius" alt="Profile-Image" />
                                        </div>
                                        {
                                            userImg?.length === '' || userImg === "" ? (
                                                <>
                                                    {/* <input
                                                    /> */}
                                                    <Button id="file-input"
                                                        type="file"
                                                        accept=".png, .jpg, .jpeg">Upload Image</Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button>Update Image</Button>
                                                    <Button>Delete Image</Button>
                                                </>
                                            )
                                        }
                                        {/* <h6 className="f-w-600">User Profile</h6> */}
                                        <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="card-block">
                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">User Information</h6>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">FullName</p>
                                                <h6 className="text-muted f-w-400">{fullName || "techon"}</h6>
                                                <p className="m-b-10 f-w-600">Email</p>
                                                <h6 className="text-muted f-w-400">{email || "techon@gmail.com"}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Phone</p>
                                                <h6 className="text-muted f-w-400">+92334567890</h6>
                                            </div>
                                        </div>
                                        {/* 
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Password Update</h6>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">Old Password</p>
                                                                <input
                                                                    type="password"
                                                                    className="form-control"
                                                                    value={oldPassword}
                                                                    onChange={(e) => setOldPassword(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <p className="m-b-10 f-w-600">New Password</p>
                                                                <input
                                                                    type="password"
                                                                    className="form-control"
                                                                    value={newPassword}
                                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-primary mt-3" onClick={handlePasswordUpdate}>
                                                            Update Password
                                                        </button>
                                                    </div>
                                                </div> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileMain
