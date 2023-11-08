import Swal from 'sweetalert2';
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
    </>
  )
}

export default ImageDiv
