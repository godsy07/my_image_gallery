import { useState } from 'react';
import { Image } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { FaEye, FaTimesCircle, FaTrashAlt } from 'react-icons/fa';

import './image-div.styles.css'
import { useAuth } from '../auth/AuthContext';
import { useToast } from '../../context/ToastContext';
import { handleDeleteMyImageFromList } from '../../api/apiCalls';

const ImageDiv = ({ image_data, refreshFetchURL = () => {} }) => {
    const { authUser } = useAuth();
    const { addToast } = useToast();
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageModalOpen, setImageModalOpen] = useState(false);

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

    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

  return (
    <>
        <div 
            className='image-div cursor-pointer hover-container'
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
                    <div className='w-100 text-center'>Hi</div>
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
    </>
  )
}

export default ImageDiv
