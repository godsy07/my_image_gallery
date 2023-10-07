import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { FaGithubSquare, FaLinkedin, FaInstagramSquare } from "react-icons/fa";

import ImageDiv from "../../components/image-div/ImageDiv";
import PageHeader from "../../components/layout/PageHeader";
import PageFooter from "../../components/layout/PageFooter";
import ImageDataList from "../../components/image-data-list/ImageDataList";

import { data } from "../../data/data";
import "./main-page.styles.css";
import { BASE_URL } from "../../config/config";

const MainPage = () => {
  return (
    <>
      <PageHeader />
      <div className='main-div'>
        <ImageDataList
          user_type="all"
          loading={false}
          image_list={data}
          fetch_url={`${BASE_URL}/images/get-paginated-images`}
        />
      </div>
      <PageFooter />
    </>
  );
};

export default MainPage;
