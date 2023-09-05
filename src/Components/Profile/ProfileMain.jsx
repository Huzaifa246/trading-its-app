import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import "./ProfileMain.css";
import { Button, Modal } from 'react-bootstrap';
import DeleteUserImage from '../../helpers/PostApis/DeleteImage';
import UpdatePasswordApi from '../../helpers/PostApis/UpdatePassword';
import defImg from "../../../public/avatar.svg"
import defImg1 from "../../../public/avatar1.jpeg";
import defImg2 from "../../../public/default-img.png";
import { FiEdit2, FiEye, FiEyeOff } from "react-icons/fi";
import UploadImage from '../../helpers/PostApis/UploadImage';
import Loader from '../Loader';
import UpdateImage from './../../helpers/PostApis/UpdateImage';
import EditUserDetails from '../../helpers/PostApis/EditUserDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfileMain() {
    const userDetails = useSelector((state) => state.userInfoStore.userDetails);
    const userId = userDetails?.data?._id;
    // const fullName = userDetails?.data?.fullName;
    const fNameU = userDetails?.data?.fullName;
    const bin_id = userDetails?.data?.binance_id;
    const email = userDetails?.data?.email;
    const userImg = userDetails?.data?.profile_image?.url;
    // const binance_id = userDetails?.data?.binance_id;

    const [isPasswordUpdateOpen, setIsPasswordUpdateOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [userToDelete, setUserToDelete] = useState(null);

    const [imageBase64, setImageBase64] = useState("");
    const [isImageUploading, setIsImageUploading] = useState(false);

    const [isFullNameEdit, setIsFullNameEdit] = useState(false);
    const [isBinanceIdEdit, setIsBinanceIdEdit] = useState(false);
    const [fullName, setFullName] = useState('');
    const [binanceId, setBinanceId] = useState('');
    const [showModalEdit, setShowModalEdit] = useState(false);

    const [isProfileViewOpen, setIsProfileViewOpen] = useState(false);
    const [profileViewImage, setProfileViewImage] = useState('');

    //Profile view
    const handleProfileViewClick = (imageURL) => {
        setProfileViewImage(imageURL);
        setIsProfileViewOpen(true);
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    useEffect(() => {
        // Set initial values for fullName and binanceId when userDetails changes
        setFullName(userDetails?.data?.fullName || '');
        setBinanceId(userDetails?.data?.binance_id || '');
    }, [userDetails]);

    //-- Upload image
    const handleFileUploadClick = (event) => {
        event.preventDefault();
        const fileInput = document.getElementById("file-input");
        fileInput.click();
    };
    const handleImageChange = async (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64String = reader.result;

            setImageBase64(base64String);
            setIsImageUploading(true);

            try {
                const response = await UpdateImage(userId, base64String);
                if (response.success) {
                    alert(response.message)
                    window.location.reload()
                } else {
                    return "image upload failed"
                }
            } catch (error) {
                console.error('Error uploading profile picture:', error);
            }
        };
    };
    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64String = reader.result;

            setImageBase64(base64String);
            setIsImageUploading(true);
            try {
                const response = await UploadImage(userId, base64String);
                if (response.success) {
                    setIsImageUploading(false);
                    toast.success(response.message, {
                        position: "top-center",
                    });
                    setTimeout(function () {
                        window.location.reload();
                    }, 3000);
                } else {
                    setIsImageUploading(false);
                    toast.error(response.message, {
                        position: "top-center",
                    });
                    return "image upload failed"
                }
            } catch (error) {
                console.error('Error uploading profile picture:', error);
            }
        };
    };

    //---- del image
    const handleConfirmDelete = (userId) => {
        setUserToDelete(userId);
        setShowModal(true); // Open the confirmation modal
    };

    const handleDeleteConfirmed = async () => {
        if (userToDelete) {
            try {
                await DeleteUserImage(userToDelete);
                window.location.reload(); // Reload the page after deletion
            } catch (error) {
                console.error('Error deleting user Image:', error);
            }
        }
        setShowModal(false); // Close the confirmation modal
    };
    //--Bi start
    const handleUserDetailsUpdate = async () => {
        try {
            if (isFullNameEdit || isBinanceIdEdit) {
                const response = await EditUserDetails(userId, fullName, binanceId);

                if (response.success) {
                    setShowModalEdit(true);
                    setIsFullNameEdit(false);
                    setIsBinanceIdEdit(false);
                } else {
                    console.error('Failed to update user details');
                }
            }
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };
    //--Binance ends

    //---password Update
    const handlePasswordUpdate = async () => {
        try {
            if (!newPassword) {
                setModalMessage('New password cannot be empty');
                setShowUpdateModal(true);
            } else if (oldPassword === newPassword) {
                setModalMessage('Old and new passwords cannot be the same');
                setShowUpdateModal(true);
            } else if (!oldPassword.trim()) {
                setModalMessage('Old password is empty. Please enter your old password');
                setShowUpdateModal(true);
            }
            else if (newPassword !== confirmPassword) {
                setModalMessage('New password and confirm password do not match');
                setShowUpdateModal(true);
            }
            else {
                const response = await UpdatePasswordApi(userId, oldPassword, newPassword);
                setModalMessage(response.message);
                setShowUpdateModal(true);
                if (response?.data?.success) {
                    setModalMessage(response.message);
                    setShowUpdateModal(true);
                } else if (response) {
                    setModalMessage(response.message);
                    setShowUpdateModal(true);
                } else {
                    setModalMessage('Password update failed');
                    setShowUpdateModal(true);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        window.location.reload();
    };
    const UpdateCloseModal = () => {
        setShowUpdateModal(false);
        window.location.reload();
    };
    const EditCloseModal = () => {
        setShowModalEdit(false);
        window.location.reload();
    };
    return (
        <>
            {isImageUploading && <Loader />}
            <ToastContainer />
            <Modal show={showUpdateModal} onHide={UpdateCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Password Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={UpdateCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the image?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirmed}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalEdit} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        FullName:  {fullName}
                    </div>
                    <div>
                        BinanceID: {binanceId}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={EditCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Profile View */}
            <Modal show={isProfileViewOpen} onHide={() => setIsProfileViewOpen(false)}
                className="custom-modal-content"
                centered
            >
                <Modal.Body>
                    <div className="text-center position-relative">
                        <img
                            src={profileViewImage}
                            alt="Profile"
                            style={{
                                borderRadius: '50%', maxWidth: '400px', width: "300px",
                                maxHeight: "400px", height: "300px", objectFit: 'cover'
                            }}
                        />
                    </div>
                </Modal.Body>
            </Modal>
            <div className="padding-top"></div>
            <div className="page-content page-container" id="page-content">
                <div className="row container d-flex justify-content-center" style={{ margin: "20px 0", maxWidth: "100%" }}>
                    <div className="col-xl-6 col-md-12">
                        <div className="card user-card-full">
                            <div className="row main-container-pf">
                                <div className="col-sm-12 user-profile">
                                    <div className="card-block text-center text-white">
                                        <div className="p-b-15">
                                            <img src={userImg || defImg2} className="img-radius" alt="Profile-Image"
                                                onClick={() => handleProfileViewClick(userImg || defImg2)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </div>
                                        {(userImg === '' || userImg === defImg2) ? (
                                            <>
                                                <label htmlFor="file-input" className="fi-edit-label edit-style">
                                                    <FiEdit2 onClick={handleFileUploadClick} className='FiEdit-inner-style' />
                                                </label>
                                                <input
                                                    id="file-input"
                                                    type="file"
                                                    accept=".png, .jpg, .jpeg"
                                                    style={{ display: 'none' }}
                                                    onChange={(event) => handleFileInputChange(event)}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <div className='Main-update-del'>
                                                    <div style={{ padding: "0 5px" }}>
                                                        <label htmlFor="file-input" className="fi-edit-label">
                                                            <button onClick={handleFileUploadClick} className='Update-btn'>Update</button>
                                                        </label>
                                                        <input
                                                            id="file-input"
                                                            type="file"
                                                            accept=".png, .jpg, .jpeg"
                                                            style={{ display: 'none' }}
                                                            onChange={(event) => handleImageChange(event)}
                                                        />
                                                    </div>
                                                    <div style={{ padding: "0 5px" }}>
                                                        <button className='del-btn' onClick={() => handleConfirmDelete(userId)}> Delete </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                </div>
                                <div className="col-sm-12 sec-container">
                                    <div className="card-block">
                                        <div className='user-info-style'>
                                            <h6 className="p-b-5 f-w-600"><b>User Information </b></h6>

                                            {isFullNameEdit || isBinanceIdEdit ? (
                                                <Button
                                                    className='edit-btn'
                                                    onClick={handleUserDetailsUpdate} // Update user details when clicked
                                                >
                                                    Save
                                                </Button>
                                            ) : (
                                                <Button
                                                    className='edit-btn'
                                                    onClick={() => {
                                                        setIsFullNameEdit(!isFullNameEdit); // Toggle edit mode for FullName
                                                        setIsBinanceIdEdit(!isBinanceIdEdit); // Toggle edit mode for Binance Id
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            )}
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12">
                                                <p className="m-b-10 f-w-600  m-t-10">FullName</p>
                                                {isFullNameEdit ? (
                                                    <input
                                                        type="text"
                                                        className="form-control input_field"
                                                        value={fullName}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                        onBlur={handleUserDetailsUpdate}
                                                    />
                                                ) : (
                                                    <input
                                                        type="text"
                                                        className="input_field"
                                                        value={fNameU || "ITS"}
                                                        disabled
                                                        style={{
                                                            width: "100%"
                                                        }}
                                                    />
                                                )}
                                                <p className="m-b-10 f-w-600 m-t-10">Email</p>
                                                <input
                                                    type="text"
                                                    className="input_field"
                                                    value={email || "its@gmail.com"}
                                                    disabled
                                                    style={{
                                                        width: "100%"
                                                    }}
                                                />
                                                {/* <h6 className="text-muted f-w-400">{email || "techon@gmail.com"}</h6> */}
                                            </div>
                                            <div className="col-sm-12 col-md-12">
                                                <p className="m-b-10 f-w-600 m-t-10">Binance Id</p>
                                                {isBinanceIdEdit ? (
                                                    <input
                                                        type="text"
                                                        className="form-control input_field"
                                                        value={binanceId}
                                                        onChange={(e) => setBinanceId(e.target.value)}
                                                        onBlur={handleUserDetailsUpdate}
                                                    />
                                                ) : (
                                                    <input
                                                        type="text"
                                                        className="input_field"
                                                        value={bin_id}
                                                        disabled
                                                        style={{
                                                            width: "100%"
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-content page-container" style={{ marginBottom: "100px", paddingRight: "5px" }} id="page-content">
                <div className="row container d-flex justify-content-center" style={{ margin: "20px 0", maxWidth: "100%" }}>
                    <div className="col-xl-6 col-md-12">
                        <div className="card user-card-full ">
                            <div className="row main-container-pf">
                                <div className="col-sm-12 card-block">
                                    <div style={{ padding: "0 5px" }}>
                                        <h6 className="m-b-20 m-t-20 p-b-5 f-w-600 pass-color"
                                            onClick={() => setIsPasswordUpdateOpen(!isPasswordUpdateOpen)}
                                        >
                                            Password Update
                                        </h6>

                                        {isPasswordUpdateOpen && (
                                            <div className="row">
                                                <div className="col-sm-12 col-md-12">
                                                    <p className="m-b-10 f-w-600 color-white">Old Password</p>
                                                    <input
                                                        type="password"
                                                        className="form-control input_field"
                                                        value={oldPassword}
                                                        required
                                                        onChange={(e) => setOldPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-sm-12 col-md-12">
                                                    <p className="m-b-10 f-w-600 color-white">New Password</p>
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        required
                                                        className="form-control input_field"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                    />
                                                    <div className="input-group-append eye-style-absolute">
                                                        <button
                                                            className="btn btn-secondary bg-transparent border-0"
                                                            type="button"
                                                            onClick={togglePasswordVisibility}
                                                        >
                                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-12">
                                                    <p className="m-b-10 f-w-600 color-white">Confirm Password</p>
                                                    <input
                                                        type={showPassword ? "text" : "password"} // Use the 'showPassword' state
                                                        required
                                                        className="form-control input_field"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className='up-btn-style'>
                                                    <Button className="btn btn-primary mt-3 uni-btn" onClick={handlePasswordUpdate}>
                                                        Update Password
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
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
