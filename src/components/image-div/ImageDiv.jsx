import { useState } from 'react';
import { Image } from 'react-bootstrap'

import './image-div.styles.css'
import { FaTimesCircle } from 'react-icons/fa';

const ImageDiv = ({ image_data }) => {
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

  return (
    <>
        <div className='image-div cursor-pointer' onClick={() => openImageModalOverlay(image_data)}>
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
