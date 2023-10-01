import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { FaGithubSquare, FaLinkedin, FaInstagramSquare } from "react-icons/fa";

import ImageDiv from "../../components/image-div/ImageDiv";
import PageHeader from "../../components/layout/PageHeader";

import { data } from "../../data/data";
import "./main-page.styles.css";

const MainPage = () => {
  const [imageList, setImageList] = useState(data);
  const [imageListLoading, setImageListLoading] = useState(false);

  const [pageNo, setPageNo] = useState(1);
  // const [pageNoSeries, setPageNoSeries] = useState([1]);
  // const [visiblePageNoSeries, setVisiblePageNoSeries] = useState([1]);
  const [pageNoSeries, setPageNoSeries] = useState([1, 2, 3, 4, 5, 6]);
  const [visiblePageNoSeries, setVisiblePageNoSeries] = useState([1, 2, 3, 4]);

  const handlePageNoChange = (e, page_no) => {
    e.preventDefault();
    if (!isNaN(page_no)) {
      setPageNo(parseInt(page_no, 10));
    } else {
      let update_value = 1;
      if (page_no === "first") {
        if (pageNo !== 1) update_value = 1;
      } else if (page_no === "previous") {
        if (pageNo !== 1) update_value = pageNo - 1;
      } else if (page_no === "next") {
        if (pageNo !== pageNoSeries.length) update_value = pageNo + 1;
      } else if (page_no === "last") {
        if (pageNo !== pageNoSeries.length) update_value = pageNoSeries.length;
      }
      setPageNo(update_value);
      checkPageExistsInVisbilePagenoSeries(page_no, update_value);
    }
  };

  const checkPageExistsInVisbilePagenoSeries = (action, update_value) => {
    if (!visiblePageNoSeries.includes(update_value)) {
      setVisiblePageNoSeries((prevArray) => {
        let data = [];

        if (action === 'first') {
          data = pageNoSeries.slice(0, 4);
        } else if (action === 'previous') {
          data = [ update_value,...prevArray]
          data.pop();
        } else if (action === 'next') {
          data = [...prevArray, update_value]
          data.shift();
        } else if (action === 'last') {
          data = pageNoSeries.slice(pageNoSeries.length - 4);
        }

        return data;
      });
    }
  }

  return (
    <>
      <PageHeader />
      <div className='main-div'>
        <div className='image-list-div'>
          {imageListLoading ? (
            <>
              <Spinner animation='grow' className='mx-1' />
              <Spinner animation='grow' className='mx-1' />
              <Spinner animation='grow' className='mx-1' />
            </>
          ) : imageList.length === 0 ? (
            <p className='mt-5'>No image exsits.</p>
          ) : (
            <div className='image-grid-area'>
              {imageList.map((img, idx) => (
                <ImageDiv key={idx} image_data={img} />
              ))}
            </div>
          )}

          {imageList.length > 0 && (
            <div className='image-list-footer'>
              <div className='d-flex'>
                <Button
                  variant='secondary'
                  disabled={pageNo === 1}
                  className='border border-dark me-1 p-0 px-1'
                  onClick={(e) => handlePageNoChange(e, "first")}
                >
                  &lt;&lt;
                </Button>
                <Button
                  variant='secondary'
                  disabled={pageNo === 1}
                  className='border border-dark me-1'
                  onClick={(e) => handlePageNoChange(e, "previous")}
                >
                  &lt;
                </Button>

                {visiblePageNoSeries.map((item) => (
                  <Button
                    key={item}
                    variant={pageNo === item ? "primary" : "secondary"}
                    className='border border-dark me-1'
                    onClick={(e) => handlePageNoChange(e, item)}
                  >
                    {item}
                  </Button>
                ))}

                <Button
                  variant='secondary'
                  disabled={pageNo === pageNoSeries.length}
                  className='border border-dark me-1'
                  onClick={(e) => handlePageNoChange(e, "next")}
                >
                  &gt;
                </Button>
                <Button
                  variant='secondary'
                  disabled={pageNo === pageNoSeries.length}
                  className='border border-dark me-1 p-0 px-1'
                  onClick={(e) => handlePageNoChange(e, "last")}
                >
                  &gt;&gt;
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className='page-footer d-flex justify-content-center align-items-center'>
        <div>
          <span className='me-2'>
            Created By
            <a
              className='ms-1'
              href='https://godsy07.netlify.app/'
              title='Godsy07 Portfolio'
              target='_blank'
              style={{ color: "#fff !important" }}
            >
              Godsy07
            </a>
          </span>
          <a
            className='me-1'
            href='https://github.com/godsy07'
            title='Github'
            target='_blank'
          >
            <FaGithubSquare style={{ fontSize: "20px", color: "#fff" }} />
          </a>
          <a
            className='me-1'
            href='https://www.linkedin.com/in/godsy07/'
            title='LinkedIn'
            target='_blank'
          >
            <FaLinkedin style={{ fontSize: "20px", color: "#fff" }} />
          </a>
          <a
            className='me-1'
            href='https://godsy07.netlify.app/'
            title='Instagram'
            target='_blank'
          >
            <FaInstagramSquare style={{ fontSize: "20px", color: "#fff" }} />
          </a>
        </div>
      </footer>
    </>
  );
};

export default MainPage;
