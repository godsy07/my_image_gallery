import axios from 'axios';
import Swal from 'sweetalert2';
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import { Row, Col, Form, FormGroup, Button, Spinner } from 'react-bootstrap';

import { BASE_URL } from '../../config/config';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../components/auth/AuthContext';
import { getUserDetails, updateUserDetails } from '../../api/apiCalls';
import UserContainerLayout from '../../components/layout/UserContainerLayout'

const Settings = () => {
  const { authUser } = useAuth();
  const { addToast } = useToast();
  const [cookies] = useCookies('my_api_token');
  const [detailsUpdating, setDetailsUpdating] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [userEditData, setUserEditData] = useState({
    id: "", first_name: "", last_name: "", email: "", current_password: "", new_password: "", repeat_password: ""
  });

  useEffect(() => {
    if (authUser) fetchUserDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[authUser])

  const fetchUserDetails = async () => {
    const user_id = authUser ? authUser.id: '';
    if (!user_id) return;
    const userData = await getUserDetails(user_id);
    if (userData.status) {
      const data = userData.data;
      setUserEditData({
        user_id: data._id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        current_password: data.current_password,
      });
    } else {
      console.log(userData.message);
    }
  }

  const handleEditDataChange = (e) => {
    setUserEditData(prevData => ({...prevData, [e.target.name]: e.target.value}));
  }

  const handleUpdateUserDetails = async(e) => {
    if (!(userEditData && userEditData.user_id)) return;
    const updateObject = {
      user_id: (userEditData && userEditData.user_id)?userEditData.user_id:"",
      first_name: (userEditData && userEditData.first_name)?userEditData.first_name:"",
      last_name: (userEditData && userEditData.last_name)?userEditData.last_name:"",
      email: (userEditData && userEditData.email)?userEditData.email:"",
      current_password: (userEditData && userEditData.current_password)?userEditData.current_password:"",
      change_password: changePassword,
    };
    if (changePassword) {
      updateObject.new_password = (userEditData && userEditData.new_password)?userEditData.new_password:"";
      updateObject.repeat_password = (userEditData && userEditData.repeat_password)?userEditData.repeat_password:"";
    }
    
    const response = await updateUserDetails(updateObject);
    if (response.status) {
      addToast({ type: "success", heading: "Success", message: response.message });
    } else {
      addToast({ type: "error", heading: "Error", message: response.message });
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
            <Form.Check type="switch" label="Update Password?" checked={changePassword} onChange={() => setChangePassword(!changePassword)} />
          </FormGroup>
        </Col>
      </Row>
      {changePassword && (
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
              <Form.Control type="password" name="repeat_password" value={userEditData?userEditData.repeat_password:""} onChange={handleEditDataChange} placeholder="Set up new password" />
            </FormGroup>
          </Col>
        </Row>
      )}
      <Row className='m-0 p-0 mb-3'>
        <Col>
          <Button onClick={handleUpdateUserDetails}>{detailsUpdating?<Spinner animation='border' size='sm' />:"Update Details"}</Button>
        </Col>
      </Row>
    </UserContainerLayout>
  )
}

export default Settings
