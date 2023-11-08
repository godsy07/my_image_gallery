import axios from 'axios'
import React, { useState } from 'react'
import { ImUpload } from 'react-icons/im'
import { useCookies } from 'react-cookie'
import { FaRegTimesCircle } from 'react-icons/fa'
import { Button, Col, Form, FormGroup, Image, Modal, Row, Badge } from 'react-bootstrap'

import { BASE_URL } from '../../config/config'
import { useToast } from '../../context/ToastContext'
import { useAuth } from '../../components/auth/AuthContext'
import ImageDataList from '../../components/image-data-list/ImageDataList'
import UserContainerLayout from '../../components/layout/UserContainerLayout'

const Dashboard = () => {
  const { authUser } = useAuth();
  const { addToast } = useToast();
  const [ cookies ] = useCookies("my_api_token");
  const [showUploadImageDiv, setShowUploadImageDiv] = useState(false);

  const [image, setImage] = useState(null);
  const [imageFetchCount, setImageFetchCount] = useState(0);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const [description, setDescription] = useState("");

  const handleCloseUploadImageDiv = () => {
    setShowUploadImageDiv(false);
  }

  const resetAddImageValues = () => {
    setImage(null)
    setTag("");
    setTitle("");
    setTagList([]);
    setDescription("");
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
      const formData = new FormData();
      formData.append('image', image);
      formData.append('image_title', title);
      formData.append('image_description', description);
      for (let i = 0; i < tagList.length; i++) {
        formData.append(`image_tags[${i}]`, tagList[i]);
      }

      const response = await axios.post(`${BASE_URL}/images/upload-a-public-images`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${cookies.my_api_token}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setImageFetchCount(imageFetchCount + 1)
        resetAddImageValues();
        handleCloseUploadImageDiv();
        addToast({ type: "success", heading: "Success", message: response.data.message });
      }

    } catch(e) {
      if (e.response) {
        console.log("e.res: ", e.response)
        addToast({ type: "error", heading: "Error", message: e.response.data.message });
      } else {
        addToast({ type: "error", heading: "Error", message: "Something went wrong!!!" });
      }
    }
  }

  const handleChangeTag = (e) => {
    setTag(e.target.value);
  }
  const handleOnKeyPressTag = (e) => {
    if (e.which === 13) {
      // enter key pressed
      setTagList(prev => [ ...prev, e.target.value ]);
      setTag("");
      return;
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const removeTag = (indexToRemove) => {
    if (isNaN(indexToRemove)) return; 
    setTagList(prevArray =>  prevArray.filter((_, index) => index !== indexToRemove));
  }

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
            <Form.Control type='text' value={tag} onChange={handleChangeTag} onKeyUp={handleOnKeyPressTag} placeholder='Enter tag value' />
            <div>
              {tagList && tagList.map((item, idx) => (
                <Badge pill bg="primary" key={idx} className='pe-4 me-1' style={{ position: "relative" }}>
                  {item}
                  <div style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)"  }}><FaRegTimesCircle onClick={() => removeTag(idx)} style={{ cursor: "pointer" }} /></div>
                </Badge>
              ))}
            </div>
          </FormGroup>
          <FormGroup as={Col} xs={12} md={12} className='mb-3'>
            <Form.Label>Drop your image here:</Form.Label>
            <Form.Control type='file' onChange={handleImageChange} />
            {image && (
              <div className='w-100 mt-2'>
                <Image src={URL.createObjectURL(image)} className='rounded' style={{ maxHeight: "100px" }} />
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
          fetch_count={imageFetchCount}
          refreshFetchURL={() => setImageFetchCount(imageFetchCount + 1)}
          fetch_url={`${BASE_URL}/images/get-my-paginated-images/${authUser && authUser.id}`}
        />
      </UserContainerLayout>
    </>
  )
}

export default Dashboard
