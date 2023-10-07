import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'

import './layout.styles.css'
import { useAuth } from '../auth/AuthContext';

const PageHeader = () => {
  const { authUser } = useAuth();

  return (
    <>
      <Navbar expand="lg" className='bg-success' sticky='top'>
      <Container>
        <Navbar.Brand href="/">Image Gallery</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {!authUser && (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
            <NavDropdown title={`Logged User: ${authUser?authUser.name:""}`} id="navbarScrollingDropdown">
              <NavDropdown.Item href="/dashboard">
                Dashboard
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#setting_page">
                My Settings
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
    </>
  )
}

export default PageHeader
