import { useState } from 'react';
import { Image } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { FaTimesCircle, FaTrashAlt } from 'react-icons/fa';

import './image-div.styles.css'
import { useAuth } from '../auth/AuthContext';
import { useToast } from '../../context/ToastContext';
import { handleDeleteMyImageFromList } from '../../api/apiCalls';

const ImageDiv = ({ image_data, refreshFetchURL = () => {} }) => {
    const { authUser } = useAuth();
    const { addToast } = useToast();
    const location = useLocation();
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openImageModalOverlay = (image) => {
        setSelectedImage(image);
        setImageModalOpen(true);
    };

    const closeImageModalOverlay = () => {
        setSelectedImage(null);
        setImageModalOpen(false);
    };

    const handleDeleteImage = async(image_id) => {
        const response = await handleDeleteMyImageFromList(image_id);
        if (response.status) {
            addToast({ type: "success", heading: "Success", message: response.message });
            // refetch image list
            refreshFetchURL && refreshFetchURL();
        } else {
            addToast({ type: "error", heading: "Error", message: response.message });
        }
    }

  return (
    <>
        <div className='image-div cursor-pointer' style={{ position: "relative" }}>
        {/* <div className='image-div cursor-pointer' onClick={() => openImageModalOverlay(image_data)} style={{ position: "relative" }}> */}
            {authUser && location.pathname === "/dashboard" && (
                <div style={{ position: 'absolute', top: "5px", right: "5px" }}>
                    <FaTrashAlt onClick={() => handleDeleteImage(image_data._id)} />
                </div>
            )}
            <Image className='image-area' src={`${image_data.file_path}`} />
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
    </>
  )
}

export default ImageDiv
