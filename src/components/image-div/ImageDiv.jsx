import { useState } from 'react';
import { Image, Modal } from 'react-bootstrap'

import './image-div.styles.css'

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
        <Modal show={imageModalOpen} onHide={closeImageModalOverlay} fullscreen={true} className='m-0 p-0'>
            <Modal.Header closeButton={true}>
                {selectedImage && (
                    <h2 className='text-center w-100'>{selectedImage.title}</h2>
                )}
            </Modal.Header>
            <Modal.Body>
                {selectedImage && (
                    <Image src={selectedImage.file_path} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                )}
            </Modal.Body>
        </Modal>
    </>
  )
}

export default ImageDiv
