import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'

import './layout.styles.css'
import Logo from '../../assets/images/logo.png';
import { useAuth } from '../auth/AuthContext';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const PageHeader = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies("my_api_token");
  const { authUser, userLogout } = useAuth();

  const handleUserLogout = async() => {
    removeCookie("my_api_token");
    userLogout();
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'You have been logged out.'
    });
    navigate("/");
  }

  return (
    <>
      <Navbar expand="lg" className='page-header' sticky='top'>
      <Container>
        <Navbar.Brand className='d-flex align-items-center justify-content-center' href="/">
          <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Image Gallery Logo"
          />{" "}
          Image Gallery
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {!authUser ? (
              <Nav.Link href="/login">Login</Nav.Link>
            ) : (
              <NavDropdown title={`User: ${authUser?authUser.name.split(" ")[0]:""}`} id="navbarScrollingDropdown">
                <NavDropdown.Item href="/dashboard">
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item href="#setting_page">
                  My Settings
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleUserLogout}>
                  Logout
                </NavDropdown.Item>
                {/* <NavDropdown.Item href="#setting_page">
                  Logout
                </NavDropdown.Item> */}
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
    </>
  )
}

export default PageHeader
