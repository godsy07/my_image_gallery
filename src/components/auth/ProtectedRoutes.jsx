import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import jwtDecode from 'jwt-decode'
import { useCookies } from 'react-cookie'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button, Col, Nav, Navbar, Row, Spinner } from 'react-bootstrap'

import { useAuth } from "../auth/AuthContext"

const LazyOutletWrapper = lazy(() => import("../wrapper/OutletWrapper"))

const ProtectedRoutes = ({ accessible_to=['user'] }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const sidebardRef = useRef(null);
    const [sideBarVisible, setSideBarVisible] = useState(true);
    const [cookies, removeCookie] = useCookies("my_api_token");
    const { authUser, userLogin, userLogout, isUserAuthenticated } = useAuth();
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
    
      useEffect(() => {
        // Add event listener to listen for window resize
        window.addEventListener('resize', handleResize);
        if (window.innerWidth >= 768) {
            setSideBarVisible(true);
        } else {
            setSideBarVisible(false);
        }
    
        // Remove event listener when component unmounts
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [window.innerWidth, window.innerHeight]);
    

    useEffect(() => {
        if (cookies.my_api_token) {
            const token = cookies.my_api_token !== "undefined" ? cookies.my_api_token : null;
            if (token) {
                const decoded = jwtDecode(token);
                if (decoded) {
                    if (decoded.exp * 1000 < Date.now()) {
                        // Token expired
                        userLogout();
                        removeCookie("my_api_token")
                        navigate("/login")
                    } else {
                        // Save authenticated Details
                        if (!isUserAuthenticated()) userLogin(decoded);
                        checkUserHasPageAccess(decoded);
                    }
                } else {
                    userLogout();
                    navigate("/login")
                }
            } else {
                userLogout();
                navigate("/login")
            }
        } else {
            userLogout();
            navigate("/login")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        // Check if user is logged in or not, else redirect then to Dashboard
        if (isUserAuthenticated()) {
            checkUserHasPageAccess(authUser);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location.pathname, authUser])

    useEffect(() => {
        if (sidebardRef.current) {
            checkVisibility()
        }
    },[sidebardRef.current])


    const checkUserHasPageAccess = (user_data) => {
        if (!userHasPageAccess(user_data.user_type)) {
            Swal.fire({
                icon: 'warning',
                title: 'Unauthorized',
                text: 'You are not authorized to access this page.',
            })
            navigate("/dashboard")
        }
    }

    const userHasPageAccess = (user_type) => {
        return accessible_to.includes(user_type)
    }

    const checkVisibility = () => {
        if (sidebardRef.current) {
          const rect = sidebardRef.current.getBoundingClientRect();
    
          // Check if the element is in the viewport
          if (
            rect.width > 0 &&
            rect.height > 0
          ) {
            setSideBarVisible(true);
          } else {
            setSideBarVisible(false);
          }
        }
      };

      const handleUserLogout = async() => {
        //confirm if user is sure to logout
        const confirmLogout = await Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: 'Are you sure you want to logut?',
            confirmButtonText: "Yes",
            showCancelButton: true,
            cancelButtonText: "No",
        });
        if (!confirmLogout.isConfirmed) return;
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
        <main className='d-flex justify-content-between'>
            <div ref={sidebardRef} className='bg-primary p-2 d-none d-sm-none d-md-flex d-lg-flex flex-column justify-content-center align-items-center' style={{ width: "250px", height: "100vh", position: "fixed", fontSize: "20px", overflowY: "scroll", overflowX: "hidden" }}>
                <NavLink
                    to='/dashboard'
                    className="my-2 p-2 w-100 text-center rounded"
                    style={({ isActive }) => ({
                        color: isActive ? '#fff' : '#545e6f',
                        background: isActive ? '#7600dc' : '#f0f0f0',
                    })}
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to='/settings'
                    className="my-2 p-2 w-100 text-center rounded"
                    style={({ isActive }) => ({
                        color: isActive ? '#fff' : '#545e6f',
                        background: isActive ? '#7600dc' : '#f0f0f0',
                    })}
                >
                    Settings
                </NavLink>
                {authUser && authUser.user_type === "admin" && (
                    <NavLink
                        to='/pending-images'
                        className="my-2 p-2 w-100 text-center rounded"
                        style={({ isActive }) => ({
                            color: isActive ? '#fff' : '#545e6f',
                            background: isActive ? '#7600dc' : '#f0f0f0',
                        })}
                    >
                        Pending Images
                    </NavLink>
                )}
                <Nav.Link className='my-2 py-0 w-100' onClick={handleUserLogout}>
                    <Button className='w-100 text-dark bg-light' style={{ fontSize: "20px", fontWeight: "500" }}>Logout</Button>
                </Nav.Link>
            </div>
            <div className='w-100' style={{ marginLeft: `${sideBarVisible?"250px":"0"}` }}>
                <Row className='p-0 m-0'>
                    <Col md={9} lg={10} className='p-0 m-0 w-100'>
                        <Suspense fallback={<div><Spinner animation='border' /></div>}>
                            <LazyOutletWrapper />
                        </Suspense>
                    </Col>
                </Row>
            </div>
        </main>
    </>
  )
}

export default ProtectedRoutes
