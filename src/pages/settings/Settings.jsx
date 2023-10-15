import axios from 'axios';
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { BASE_URL } from '../../config/config';
import UserContainerLayout from '../../components/layout/UserContainerLayout'
import { Row, Col, Form, FormGroup, Button, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Settings = () => {
  const [cookies] = useCookies('my_api_token');
  const [detailsUpdating, setDetailsUpdating] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [userEditData, setUserEditData] = useState({
    id: "", first_name: "", last_name: "", email: "", current_password: "", new_password: "", repeat_password: ""
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
        const userData = response.data.data;
        setUserEditData((prevData) => ({
          user_id: userData._id,
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          current_password: userData.current_password,
        }));
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
      if (!(userEditData && userEditData.user_id)) return;
      // validation needed to be added before api request

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
      const response = await axios.post(`${BASE_URL}/user/update-user`,
        updateObject,
        {
          headers: {
            'Authorization': `Bearer ${cookies.my_api_token}`,
          },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
        });
      }
      
    } catch(e) {
      setDetailsUpdating(false)
      if (e.response) {
        console.log(e.response.data)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: e.response.data.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: "Something went wrong.",
        });
      }
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
