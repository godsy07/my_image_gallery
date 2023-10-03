import { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";

import "./image-data-list.styles.css";
import ImageDiv from "../image-div/ImageDiv";

const ImageDataList = ({ fetch_url="", image_list = [], loading = false, page_limit=10 }) => {
  const [imageList, setImageList] = useState([]);
  const [imageListLoading, setImageListLoading] = useState(false);
  
  const [pageLimit, setPageLimit] = useState(page_limit);
  const [pageNo, setPageNo] = useState(1);
  const [pageNoSeries, setPageNoSeries] = useState([1, 2, 3, 4, 5, 6]);
  const [visiblePageNoSeries, setVisiblePageNoSeries] = useState([1, 2, 3, 4]);

  useEffect(() => {
    setImageList([...image_list]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image_list]);

  useEffect(() => {
    setImageListLoading(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    setPageLimit(page_limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page_limit]);

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

        if (action === "first") {
          data = pageNoSeries.slice(0, 4);
        } else if (action === "previous") {
          data = [update_value, ...prevArray];
          data.pop();
        } else if (action === "next") {
          data = [...prevArray, update_value];
          data.shift();
        } else if (action === "last") {
          data = pageNoSeries.slice(pageNoSeries.length - 4);
        }

        return data;
      });
    }
  };

  return (
    <div className='image-list-div'>
      {imageListLoading ? (
        <>
          <Spinner animation='grow' className='mx-1' />
          <Spinner animation='grow' className='mx-1' />
          <Spinner animation='grow' className='mx-1' />
        </>
      ) : imageList && imageList.length === 0 ? (
        <p className='mt-5'>No image exsits.</p>
      ) : (
        imageList &&
        imageList.length > 0 && (
          <div className='image-grid-area'>
            {imageList.map((img, idx) => (
              <ImageDiv key={idx} image_data={img} />
            ))}
          </div>
        )
      )}

      {imageList && imageList.length > 0 && (
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
  );
};

export default ImageDataList;
