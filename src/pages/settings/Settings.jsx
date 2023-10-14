import axios from 'axios';
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { BASE_URL } from '../../config/config';
import UserContainerLayout from '../../components/layout/UserContainerLayout'
import { Row, Col, Form, FormGroup, Button, Spinner } from 'react-bootstrap';

const Settings = () => {
  const [cookies] = useCookies('my_api_token');
  const [userData, setUserData] = useState(null);
  const [detailsUpdating, setDetailsUpdating] = useState(false);
  const [userEditData, setUserEditData] = useState({
    first_name: "", last_name: "", email: "", current_password: "", new_password: "", confirm_password: ""
  });

  useEffect(() => {
    fetchUserDetails();
  },[])

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/get-user-details`,
      {
        headers: {
          'Authorization': `Bearer ${cookies.my_api_token}`,
        },
      },
      {
        withCredentials: true,
      })
      if (response.status === 200) {
        console.log("response.data.data: ", response.data.data);
        setUserData(response.data.data);
        setUserEditData(response.data.data);
      }

    } catch(e) {
      if (e.response) {
        console.log("error: ", e)
      } else {
        console.log(e)
      }
    }
  }

  const handleEditDataChange = (e) => {
    setUserEditData(prevData => ({...prevData, [e.target.name]: e.target.value}));
  }

  const handleUpdateUserDetails = async(e) => {
    try {
      console.log("update user details")
    } catch(e) {
      setDetailsUpdating(false)
      if (e.response) console.log(e.response)
      else console.log(e)
    }
  }

  return (
    <UserContainerLayout>
      <h5 className='text-center w-100'>Settings</h5>
      <Row className="m-0 p-0">
        <Col xs={12} sm={6} md={6} lg={6}>
          <FormGroup className='mb-3'>
            <Form.Label>First Name:</Form.Label>
            <Form.Control type="text" name="first_name" value={userEditData?userEditData.first_name:""} onChange={handleEditDataChange} placeholder="Enter your first name" />
          </FormGroup>
          <FormGroup className='mb-3'>
            <Form.Label>Email:</Form.Label>
            <Form.Control type="text" name="email" value={userEditData?userEditData.email:""} onChange={handleEditDataChange} placeholder="Enter your email" />
          </FormGroup>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <FormGroup className='mb-3'>
            <Form.Label>Last Name:</Form.Label>
            <Form.Control type="text" name="last_name" value={userEditData?userEditData.last_name:""} onChange={handleEditDataChange} placeholder="Enter your first name" />
          </FormGroup>
        </Col>
      </Row>
      <Row className='m-0 p-0'>
        <Col xs={12} sm={6} md={6} lg={6}>
          <FormGroup className='mb-3'>
            <Form.Label>Current Password:</Form.Label>
            <Form.Control type="password" name="current_password" value={userEditData?userEditData.current_password:""} onChange={handleEditDataChange} placeholder="Enter your current password" />
          </FormGroup>
        </Col>
      </Row>
      <Row className='m-0 p-0'>
        <Col xs={12} sm={6} md={6} lg={6}>
          <FormGroup className='mb-3'>
            <Form.Label>New Password:</Form.Label>
            <Form.Control type="password" name="new_password" value={userEditData?userEditData.new_password:""} onChange={handleEditDataChange} placeholder="Set up your new password" />
          </FormGroup>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6}>
          <FormGroup className='mb-3'>
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control type="password" name="confirm_password" value={userEditData?userEditData.confirm_password:""} onChange={handleEditDataChange} placeholder="Set up new password" />
          </FormGroup>
        </Col>
      </Row>
      <Row className='m-0 p-0 mb-3'>
        <Col>
          <Button onClick={handleUpdateUserDetails}>{detailsUpdating?<Spinner animation='border' size='sm' />:"Update Details"}</Button>
        </Col>
      </Row>
    </UserContainerLayout>
  )
}

export default Settings
