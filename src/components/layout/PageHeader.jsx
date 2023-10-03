import { Container, Navbar } from 'react-bootstrap'
import './layout.styles.css'

const PageHeader = () => {
  return (
    <>
      <Navbar expand="lg" className='bg-success' sticky='top'>
      <Container>
        <Navbar.Brand href="#home">Image Gallery</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
      </Navbar>
    </>
  )
}

export default PageHeader
