import { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import jwtDecode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, FormGroup, Form } from 'react-bootstrap'

import { BASE_URL } from '../../config/config';
import { isValidEmail } from '../../utils/functions';

const LoginPage = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies("my_api_token");

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    
    const [invalidUserEmail, setInvalidUserEmail] = useState(false);
    const [invalidUserPassword, setInvalidUserPassword] = useState(false);
    const [invalidUserEmailMessage, setInvalidUserEmailMessage] = useState("");
    const [invalidUserPasswordMessage, setInvalidUserPasswordMessage] = useState("");

    const [loginLoading, setLoginLoding] = useState(false);

    useEffect(() => {
        // Check if user is logged in or not, else redirect then to Dashboard
        if (cookies.my_api_token) {
            const token = cookies.my_api_token !== "undefined" ? cookies.my_api_token : null;
            if (token) {
                const decoded = jwtDecode(token);
                if (decoded) {
                    if (decoded.exp * 1000 > Date.now()) {
                        // Token not expired
                        navigate("/dashboard")
                    }
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const validInputs = () => {
        let status = true;

        if (userEmail === "") {
            setInvalidUserEmail(true);
            setInvalidUserEmailMessage("Enter your email.");
            status = false;
        } else if (!isValidEmail(userEmail)) {
            setInvalidUserEmail(true);
            setInvalidUserEmailMessage("Enter a valid email.");
            status = false;
        } else {
            setInvalidUserEmail(false);
            setInvalidUserEmailMessage("");
        }

        if (userPassword === "") {
            setInvalidUserPassword(true);
            setInvalidUserPasswordMessage("Enter your password");
            status = false;
        } else if (userPassword.length < 6 || userPassword.length > 30) {
            setInvalidUserPassword(true);
            setInvalidUserPasswordMessage("Password must be between 6 to 30 characters in length.");
            status = false;
        } else {
            setInvalidUserPassword(false);
            setInvalidUserPasswordMessage("");
        }

        return status;
    }

    const handleSignInUser = async(e) => {
        e.preventDefault();
        if (loginLoading) return;
        try {
            // Validation of inputs
            if (!validInputs()) {
                return;
            }
            setLoginLoding(true)
            // API call to loginUser
            const response = await axios.post(`${BASE_URL}/user/login-user`,
                {
                    email: userEmail,
                    password: userPassword,
                },
            );
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                })
                setCookie("my_api_token", response.data.token)
                navigate("/dashboard");
                setLoginLoding(false)
            }
        } catch(e) {
            setLoginLoding(false)
            if (e.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: e.response.data.message,
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong!!!',
                })
            }
        }
    }

  return (
    <div className='main-div pt-0 pt-sm-3 pt-md-5 pt-lg-5 d-flex justify-content-center align-items-center'>
        <Container className='pt-0 pt-sm-0 pt-md-1 pt-lg-5'>
            <Row className='p-0 m-0 py-2 w-100 h-100'>
                <Col md={2} lg={3}></Col>
                <Col xs={12} sm={12} md={8} lg={6} className='px-2 py-3 m-0 border rounded'>
                    <div className='d-flex flex-column   justify-content-center align-items-center'>

                        <FormGroup className='mb-3 w-100'>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control isInvalid={invalidUserEmail} type='email' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder='Enter email' required />
                            {invalidUserEmail && (
                                <Form.Control.Feedback type='invalid'>{invalidUserEmailMessage}</Form.Control.Feedback>
                            )}
                        </FormGroup>
                        <FormGroup className='mb-3 w-100'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control isInvalid={invalidUserPassword} type='password' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} placeholder='Enter password' required />
                            {invalidUserPassword && (
                                <Form.Control.Feedback type='invalid'>{invalidUserPasswordMessage}</Form.Control.Feedback>
                            )}
                        </FormGroup>
                        <FormGroup className='mb-3 w-100'>
                            <Form.Check label="Remember Me" checked={rememberMe} onChange={(e) => setRememberMe(!rememberMe)} />
                        </FormGroup>
                        <div className='d-flex justify-content-center align-items-center'>
                            <Button variant='primary' className='mx-1' onClick={(e) => handleSignInUser(e)}>Login</Button>
                            <Button variant='warning' className='mx-1'>Forgot password?</Button>
                        </div>
                        <div className='mb-3 d-flex justify-content-center align-items-center'>
                            <p onClick={() => navigate("/")} className='cursor-pointer'>Back to Home</p>
                        </div>
                    </div>
                </Col>
                <Col md={2} lg={3}></Col>
            </Row>
        </Container>
    </div>
  )
}

export default LoginPage
