import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import "./ProfileMain.css";
import { Button, Modal } from 'react-bootstrap';
import DeleteUserImage from '../../helpers/PostApis/DeleteImage';
import UpdatePasswordApi from '../../helpers/PostApis/UpdatePassword';
import defImg from "../../../public/avatar.svg"
import { FiEdit2, FiCheck } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai"
import UploadImage from '../../helpers/PostApis/UploadImage';
import Loader from '../Loader';
import UpdateImage from './../../helpers/PostApis/UpdateImage';
import EditUserDetails from '../../helpers/PostApis/EditUserDetails';

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
    const [newPassword, setNewPassword] = useState('');
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

            try {
                const response = await UploadImage(userId, base64String);
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
            } else if (oldPassword === newPassword) {
                setModalMessage('Old and new passwords cannot be the same');
            } else if (!oldPassword) {
                setModalMessage('Old password empty. Check Please!!');
            } else {
                const response = await UpdatePasswordApi(userId, oldPassword, newPassword);
                setModalMessage(response.message);
                setShowUpdateModal(true);
                if (response?.data?.success) {
                    setModalMessage(response.message);
                    setShowUpdateModal(true);
                } else if (response) {
                    setModalMessage(response.data.message);
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
            <Modal show={showUpdateModal} onHide={UpdateCloseModal}>
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
            <Modal show={showModal} onHide={() => setShowModal(false)}>
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

            <Modal show={showModalEdit} onHide={handleCloseModal}>
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
            <div className="page-content page-container" id="page-content">
                <div className="row container d-flex justify-content-center" style={{ margin: "20px 0" }}>
                    <div className="col-xl-6 col-md-12">
                        <div className="card user-card-full">
                            <div className="row m-l-0 m-r-0">
                                <div className="col-sm-12 bg-left-grad user-profile">
                                    <div className="card-block text-center text-white">
                                        <div className="p-b-5">
                                            <img src={userImg || defImg} className="img-radius" alt="Profile-Image" />
                                        </div>
                                        {(userImg === '' || userImg === defImg) ? (
                                            <>
                                                <label htmlFor="file-input" className="fi-edit-label">
                                                    <FiEdit2 onClick={handleFileUploadClick} />
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
                                                    <div>
                                                        <label htmlFor="file-input" className="fi-edit-label">
                                                            <FiEdit2 onClick={handleFileUploadClick} style={{ color: 'yellow' }} />
                                                        </label>
                                                        <input
                                                            id="file-input"
                                                            type="file"
                                                            accept=".png, .jpg, .jpeg"
                                                            style={{ display: 'none' }}
                                                            onChange={(event) => handleImageChange(event)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <AiOutlineDelete style={{ color: 'red' }} onClick={() => handleConfirmDelete(userId)} />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="card-block">
                                        <div className='user-info-style'>
                                            <h6 className="p-b-5 f-w-600"><b>User Information </b></h6>

                                            {isFullNameEdit || isBinanceIdEdit ? (
                                                <FiCheck
                                                    style={{ color: 'green', cursor: 'pointer' }}
                                                    onClick={handleUserDetailsUpdate} // Update user details when clicked
                                                />
                                            ) : (
                                                <FiEdit2
                                                    style={{ color: '#0d6efd', cursor: 'pointer' }}
                                                    onClick={() => {
                                                        setIsFullNameEdit(!isFullNameEdit); // Toggle edit mode for FullName
                                                        setIsBinanceIdEdit(!isBinanceIdEdit); // Toggle edit mode for Binance Id
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">FullName</p>
                                                {isFullNameEdit ? (
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={fullName}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                        onBlur={handleUserDetailsUpdate}
                                                    />
                                                ) : (
                                                    <h6 className="text-muted f-w-400">{fNameU || "techon"}</h6>
                                                )}
                                                <p className="m-b-10 f-w-600">Email</p>
                                                <h6 className="text-muted f-w-400">{email || "techon@gmail.com"}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">Binance Id</p>
                                                {isBinanceIdEdit ? (
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={binanceId}
                                                        onChange={(e) => setBinanceId(e.target.value)}
                                                        onBlur={handleUserDetailsUpdate}
                                                    />
                                                ) : (
                                                    <h6 className="text-muted f-w-400">{bin_id}</h6>
                                                )}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12">
                                                <h6 className="m-b-20 m-t-40 p-b-5  f-w-600"
                                                    onClick={() => setIsPasswordUpdateOpen(!isPasswordUpdateOpen)}
                                                >
                                                    Password Update
                                                </h6>

                                                {isPasswordUpdateOpen && (
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
                                                        <button className="btn btn-primary mt-3" onClick={handlePasswordUpdate}>
                                                            Update Password
                                                        </button>
                                                    </div>
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
        </>
    )
}

export default ProfileMain