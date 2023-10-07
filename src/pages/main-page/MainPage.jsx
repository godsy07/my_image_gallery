import { useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import PageHeader from "../../components/layout/PageHeader";
import PageFooter from "../../components/layout/PageFooter";
import ImageDataList from "../../components/image-data-list/ImageDataList";

import "./main-page.styles.css";
import { BASE_URL } from "../../config/config";
import { useAuth } from '../../components/auth/AuthContext';

const MainPage = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies("img_mgmt_token");  
  const { userLogin, isUserAuthenticated } = useAuth();

  useEffect(() => {
    let user_logged_in = false;
    if (cookies.img_mgmt_token) {
        const token = cookies.img_mgmt_token !== "undefined" ? cookies.img_mgmt_token : null;
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded) {
                if (decoded.exp * 1000 > Date.now()) {
                    // Save authenticated Details
                    if (!isUserAuthenticated()) userLogin(decoded);
                    user_logged_in = true
                }
            }
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
      <PageHeader />
      <div className='main-div'>
        <ImageDataList
          fetch_url={`${BASE_URL}/images/get-paginated-images`}
        />
      </div>
      <PageFooter />
    </>
  );
};

export default MainPage;
