import PageHeader from "../../components/layout/PageHeader";
import PageFooter from "../../components/layout/PageFooter";
import ImageDataList from "../../components/image-data-list/ImageDataList";

import "./main-page.styles.css";
import { BASE_URL } from "../../config/config";

const MainPage = () => {
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
