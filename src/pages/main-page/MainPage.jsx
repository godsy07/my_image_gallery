import { useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import { useCookies } from 'react-cookie'

import PageHeader from "../../components/layout/PageHeader";
import PageFooter from "../../components/layout/PageFooter";
import ImageDataList from "../../components/image-data-list/ImageDataList";

import "./main-page.styles.css";
import { BASE_URL } from "../../config/config";
import { useAuth } from '../../components/auth/AuthContext';

const MainPage = () => {
  const [cookies] = useCookies("my_api_token");  
  const { userLogin, isUserAuthenticated } = useAuth();

  useEffect(() => {
    if (cookies.my_api_token) {
        const token = cookies.my_api_token !== "undefined" ? cookies.my_api_token : null;
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded) {
                if (decoded.exp * 1000 > Date.now()) {
                    // Save authenticated Details
                    if (!isUserAuthenticated()) userLogin(decoded);
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
