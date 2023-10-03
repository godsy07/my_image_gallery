import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { FaGithubSquare, FaLinkedin, FaInstagramSquare } from "react-icons/fa";

import ImageDiv from "../../components/image-div/ImageDiv";
import PageHeader from "../../components/layout/PageHeader";
import PageFooter from "../../components/layout/PageFooter";
import ImageDataList from "../../components/layout/ImageDataList";

import { data } from "../../data/data";
import "./main-page.styles.css";

const MainPage = () => {
  return (
    <>
      <PageHeader />
      <div className='main-div'>
        <ImageDataList image_list={data} loading={false} />
      </div>
      <PageFooter />
    </>
  );
};

export default MainPage;
