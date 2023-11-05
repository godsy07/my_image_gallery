import React, { useState } from 'react'
import { ImUpload } from 'react-icons/im'
import { Button, Col, Form, FormGroup, Image, Modal, Row } from 'react-bootstrap'
import { BASE_URL } from '../../config/config'
import { useToast } from '../../context/ToastContext'
import { useAuth } from '../../components/auth/AuthContext'
import ImageDataList from '../../components/image-data-list/ImageDataList'
import UserContainerLayout from '../../components/layout/UserContainerLayout'

const Dashboard = () => {
  const { authUser } = useAuth();
  const { addToast } = useToast();
  const [showUploadImageDiv, setShowUploadImageDiv] = useState(false);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const [description, setDescription] = useState("");

  const handleCloseUploadImageDiv = () => {
    setShowUploadImageDiv(false);
  }

  const validateImageUploadParams = () => {
    let status = true;
    return status;
  }

  // upload-a-public-images
  const handleUploadUserImages = async (e) => {
    try {
      if (!validateImageUploadParams()) {
        return;
      }
      addToast({ type: "success", heading: "Success", message: "test" });
    } catch(e) {
      if (e.res) {
        addToast({ type: "error", heading: "Error", message: e.res.data.message });
      } else {
        addToast({ type: "error", heading: "Error", message: "Something went wrong!!!" });
      }
    }
  }

  const handleChangeTag = (e) => {
    if (e.which === 13) {
      // enter key pressed
      setTagList(prev => [ ...prev, e.target.value ]);
      setTag("");
      return;
    }
    setTag(e.target.value);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target.result;
        setImage(dataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Modal size='lg' show={showUploadImageDiv} onHide={handleCloseUploadImageDiv}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body as={Row}>

          <FormGroup as={Col} xs={12} md={6} className='mb-2'>
            <Form.Label>Title:</Form.Label>
            <Form.Control type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter image title' />
          </FormGroup>
          <FormGroup as={Col} xs={12} md={6} className='mb-2'>
            <Form.Label>Tags:</Form.Label>
            <Form.Control type='text' value={tag} onChange={handleChangeTag} placeholder='Enter tag value' />
          </FormGroup>
          <FormGroup as={Col} xs={12} md={12} className='mb-3'>
            <Form.Label>Drop your image here:</Form.Label>
            <Form.Control type='file' onChange={handleImageChange} />
            {image && (
              <div className='w-100 mt-2'>
                <Image src={image} className='rounded' style={{ maxHeight: "100px" }} />
              </div>
            )}
          </FormGroup>
          <FormGroup as={Col} xs={12} md={12} className='mb-2'>
            <Form.Label>Description:</Form.Label>
            <Form.Control as='textarea' value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUploadUserImages}>
            Submit Image
          </Button>
          <Button variant="secondary" onClick={handleCloseUploadImageDiv}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  
      <UserContainerLayout>
        <h5 className='text-center'>My Uploads</h5>
        <div className='mx-2 p-1 d-flex justify-content-end'>
          <Button onClick={() => setShowUploadImageDiv(true)}><ImUpload />&nbsp;Upload Image</Button>
        </div>
        <ImageDataList
          fetch_url={`${BASE_URL}/images/get-my-paginated-images/${authUser && authUser.id}`}
        />
      </UserContainerLayout>
    </>
  )
}

export default Dashboard
