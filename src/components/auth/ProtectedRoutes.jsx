import { lazy, Suspense, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import { useCookies } from 'react-cookie'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from "../auth/AuthContext"
import { Col, Row, Spinner } from 'react-bootstrap'
import ToastifyMessage from '../toast/ToastifyMessage'

const LazyOutletWrapper = lazy(() => import("../wrapper/OutletWrapper"))

const ProtectedRoutes = ({ accessible_to=['user'] }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies("img_mgmt_token");
    
    const { authUser, userLogin, userLogout, isUserAuthenticated } = useAuth();

    useEffect(() => {
        if (cookies.img_mgmt_token) {
            const token = cookies.img_mgmt_token !== "undefined" ? cookies.img_mgmt_token : null;
            if (token) {
                const decoded = jwtDecode(token);
                if (decoded) {
                    if (decoded.exp * 1000 < Date.now()) {
                        // Token expired
                        userLogout();
                        removeCookie("img_mgmt_token")
                        navigate("/admin_login")
                    } else {
                        // Save authenticated Details
                        if (!isUserAuthenticated()) userLogin(decoded);
                        checkUserHasPageAccess(decoded);
                    }
                } else {
                    userLogout();
                    navigate("/admin_login")
                }
            } else {
                userLogout();
                navigate("/admin_login")
            }
        } else {
            userLogout();
            navigate("/admin_login")
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

    const checkUserHasPageAccess = (user_data) => {
        if (!userHasPageAccess(user_data.user_type)) {
            ToastifyMessage({ type: 'warning', message: 'You are not authorized to access this page.' })
            navigate("/dashboard")
        }
    }

    const userHasPageAccess = (user_type) => {
        return accessible_to.includes(user_type)
    }

  return (
    <main className='main-div'>
        <Row className='p-0 m-0'>
            <Col className='p-0 m-0'>
                <Suspense fallback={<div><Spinner animation='border' /></div>}>
                    <LazyOutletWrapper />
                </Suspense>
            </Col>
        </Row>
    </main>
  )
}

export default ProtectedRoutes
