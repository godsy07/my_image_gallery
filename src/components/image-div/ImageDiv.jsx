import Swal from 'sweetalert2';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Image, Button, Modal, Row, FormGroup, Form, Col, Badge } from 'react-bootstrap'
import { FaEdit, FaEye, FaTimesCircle, FaTrashAlt, FaRegTimesCircle } from 'react-icons/fa';

import './image-div.styles.css'
import { useAuth } from '../auth/AuthContext';
import { useToast } from '../../context/ToastContext';
import { getUserImageDetails, handleDeleteMyImageFromList, updateUserImageDetails } from '../../api/apiCalls';
import { BASE_UPLOAD_URL } from '../../config/config';

const ImageDiv = ({ image_data, refreshFetchURL = () => { } }) => {
    const { authUser } = useAuth();
    const { addToast } = useToast();
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [imageEditModalOpen, setImageEditModalOpen] = useState(false);

    const [imageId, setImageId] = useState("");
    const [imageTitle, setImageTitle] = useState("");
    const [imageTag, setImageTag] = useState("");
    const [imageTagList, setImageTagList] = useState([]);
    const [imageDescription, setImageDescription] = useState("");
    const [updatedImage, setUpdatedImage] = useState(null);

    const openImageModalOverlay = (image) => {
        setSelectedImage(image);
        setImageModalOpen(true);
    };

    const closeImageModalOverlay = () => {
        setSelectedImage(null);
        setImageModalOpen(false);
    };

    const handleDeleteImage = async (image_id) => {
        if (!image_id) return;
        const confirmDelete = await Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: 'Are you sure to delete this image?',
            showDenyButton: true,
            denyButtonText: 'No',
            confirmButtonText: 'Yes',
        });
        if (!confirmDelete.isConfirmed) return;
        const response = await handleDeleteMyImageFromList(image_id);
        if (response.status) {
            // refetch image list
            refreshFetchURL && refreshFetchURL();
            addToast({ type: "success", heading: "Success", message: response.message });
        } else {
            addToast({ type: "error", heading: "Error", message: response.message });
        }
    }

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleViewImageEditModal = async (e, image) => {
        const response = await getUserImageDetails(image._id);
        if (response.status) {
            // refetch image list
            const imageData = response.imageData;
            setImageId(imageData._id)
            setImageTitle(imageData.title);
            setImageTag("");
            setImageTagList(imageData.tags)
            setUpdatedImage(imageData.file_path);
            setImageDescription(imageData.description);
            setImageEditModalOpen(true);
        } else {
            addToast({ type: "error", heading: "Error", message: response.message });
        }
    }

    const handleCloseEditModal = () => {
        setImageEditModalOpen(false);
    }

    const handleChangeTag = (e) => {
        setImageTag(e.target.value);
    }
    const handleOnKeyPressTag = (e) => {
        if (e.which === 13) {
        // enter key pressed
        setImageTagList(prev => [ ...prev, e.target.value ]);
        setImageTag("");
        return;
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdatedImage(file);
        }
    };

    const handleUpdateImageDetails = async(e) => {
        e.preventDefault();
        // check if there are changes
        // if no changes are there then no need for api call
        const formData = new FormData();
        if (typeof updatedImage !== 'string') formData.append('image', updatedImage);
        formData.append('image_id', imageId);
        formData.append('image_title', imageTitle);
        formData.append('image_description', imageDescription);
        for (let i = 0; i < imageTagList.length; i++) {
            formData.append(`image_tags[${i}]`, imageTagList[i]);
        }
        const response = await updateUserImageDetails(formData);
        if (response.status) {
            // reset values and close modal
            setImageId("");
            setImageTitle("");
            setImageTag("");
            setImageTagList([]);
            setImageDescription("");
            // then fetch updated details
            refreshFetchURL && refreshFetchURL();
            addToast({ type: "success", heading: "Success", message: response.message });
        } else {
            addToast({ type: "error", heading: "Error", message: response.message });
        }
    }

  const removeTag = (indexToRemove) => {
    if (isNaN(indexToRemove)) return; 
    setTagList(prevArray =>  prevArray.filter((_, index) => index !== indexToRemove));
  }

    return (
        <>
            <div
                className='image-div w-100 mb-3 cursor-pointer hover-container'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ position: "relative" }}
            >
                <Image className='image-area' src={`${image_data.file_path}`} />
                {isHovered && (
                    <div className="overlay d-flex flex-column justify-content-between">
                        <div className='w-100 px-2 d-flex justify-content-between'>
                            <div><FaEye onClick={() => openImageModalOverlay(image_data)} /></div>
                            {authUser && location.pathname === "/dashboard" && (
                                <div><FaTrashAlt className='text-danger' onClick={() => handleDeleteImage(image_data._id)} /></div>
                            )}
                        </div>
                        <div className='w-100 mb-4 text-center d-flex flex-column justify-content-center'>
                            <div className='overlay-image-title'>{image_data.title}</div>
                            <div className='overlay-image-description'>{image_data.description}</div>
                            {authUser && location.pathname === "/dashboard" && (
                                <div className='overlay-options text-center'>
                                    <Button size='sm' onClick={(e) => handleViewImageEditModal(e, image_data)}>
                                        <span className='d-flex justify-content-center align-items-center'>
                                            <span className='me-1'>Edit</span><FaEdit />
                                        </span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {imageModalOpen && (
                <div className='selected-image-overlay-div d-flex justify-content-center'>
                    <div className='h-100 w-100 selected-image-backdrop' onClick={closeImageModalOverlay}></div>
                    <div style={{ position: 'absolute', right: '10px', top: '0px', color: 'red', fontSize: '30px' }}>
                        <FaTimesCircle title='Close' onClick={closeImageModalOverlay} style={{ cursor: 'pointer' }} />
                    </div>
                    <Image className='w-00 img-fluid selected-image' src={selectedImage.file_path} />
                </div>
            )}

            <Modal size='lg' show={imageEditModalOpen} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body as={Row}>

                    <FormGroup as={Col} xs={12} md={6} className='mb-2'>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type='text' value={imageTitle} onChange={(e) => setImageTitle(e.target.value)} placeholder='Enter image title' />
                    </FormGroup>
                    <FormGroup as={Col} xs={12} md={6} className='mb-2'>
                        <Form.Label>Tags:</Form.Label>
                        <Form.Control type='text' value={imageTag} onChange={handleChangeTag} onKeyUp={handleOnKeyPressTag} placeholder='Enter tag value' />
                        <div>
                            {imageTagList && imageTagList.map((item, idx) => (
                                <Badge pill bg="primary" key={idx} className='pe-4 me-1' style={{ position: "relative" }}>
                                    {item}
                                    <div style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)" }}><FaRegTimesCircle onClick={() => removeTag(idx)} style={{ cursor: "pointer" }} /></div>
                                </Badge>
                            ))}
                        </div>
                    </FormGroup>
                    <FormGroup as={Col} xs={12} md={12} className='mb-3'>
                        <Form.Label>Drop your image here:</Form.Label>
                        <Form.Control type='file' onChange={handleImageChange} />
                        {updatedImage && (
                            <div className='w-100 mt-2'>
                                <Image src={(typeof updatedImage === 'string')?`${BASE_UPLOAD_URL}/${updatedImage}`:URL.createObjectURL(updatedImage)} className='rounded' style={{ maxHeight: "100px" }} />
                            </div>
                        )}
                    </FormGroup>
                    <FormGroup as={Col} xs={12} md={12} className='mb-2'>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control as='textarea' value={imageDescription} onChange={(e) => setImageDescription(e.target.value)} />
                    </FormGroup>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleUpdateImageDetails}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ImageDiv
