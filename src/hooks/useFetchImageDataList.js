/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo } from "react";
import { fetchPaginatedData } from "../api/apiCalls";

const fetchPageInfoFromImageDataList = (
  data,
  page_no,
  page_limit,
  search_term,
) => {
  let pageData = [],
    pageCount = 1,
    totalDataCount = 0,
    pageNo = page_no;

  if (page_limit > 0) {
    if (data.length > 0) {
      pageCount = Math.ceil(data.length / page_limit);

      let new_data_array = data;

      let temp_array = [];
      let pageStartIdx = 0;
      let pageEndIdx = Number(page_limit);
      for (let i = 0; i < pageCount; i++) {
        temp_array.push(new_data_array.slice(pageStartIdx, pageEndIdx));
        pageStartIdx = Number(pageEndIdx);
        pageEndIdx += Number(page_limit);
      }
      pageData = temp_array;
    }
  } else {
    pageData[0] = data;
    console.log("data: ", data);
    pageNo = 1;
  }
  totalDataCount = data.length;

  return {
    data: pageData[pageNo - 1],
    total_pages: pageCount,
    total_items: totalDataCount,
    page_no: pageNo,
  };
};

const calculatePageSeries = (page_no, page_count) => {
  let page_no_series = [1],
    returnObject = {};

    if (page_count === 1) {
    returnObject.page_no_series = page_no_series;
    returnObject.current_series = page_no_series;
  } else {
    page_no_series = Array(page_count)
      .fill()
      .map((e, index) => index + 1);

    returnObject.page_no_series = page_no_series;
    if (page_count <= 4) {
      returnObject.current_series = page_no_series;
    } else {
      let current_series = page_no_series.slice(0, 4);

      if (page_count > 4 && !current_series.includes(page_no)) {
        let temp_array = current_series;
        if (page_no === 1) {
          current_series = [1, 2, 3, 4];
        } else if (page_no === page_count) {
          current_series = [
            page_count - 3,
            page_count - 2,
            page_count - 1,
            page_count,
          ];
        }
        if (page_no - 1 === temp_array[temp_array.length - 1]) {
          // If page no has been increased by one
          current_series = [
            temp_array[1],
            temp_array[2],
            temp_array[3],
            page_no,
          ];
        } else if (page_no + 1 === temp_array[0]) {
          // If page no has been decreased by one
          current_series = [
            page_no,
            temp_array[0],
            temp_array[1],
            temp_array[2],
          ];
        }
      }

      returnObject.current_series = current_series;
    }
  }

  return returnObject;
};

const useFetchImageDataList = ({
  fetch_url = "",
  data = [],
  page_limit = 10,
  user_type,
  image_type,
  page_no = 1,
  search_term = "",
  sort_data = [],
}) => {
  const [pageData, setPageData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCountSeries, setPageCountSeries] = useState([1]);
  const [pageCurrentSeries, setPageCurrentSeries] = useState([1]);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [pageDataLoading, setPageDataLoading] = useState(false);

  const processImageDataList = async () => {

    let processedData = {
      data: [],
      total_pages: 1,
      total_items: 0,
      page_no: 1,
    };
    if (fetch_url === "") {
      //   console.log("Assign passed data as table data");
      processedData = fetchPageInfoFromImageDataList(
        data,
        page_no,
        page_limit,
        search_term,
      );
    } else {
      let new_url = `
        ${fetch_url}?search_term=${search_term}&page_no=${page_no}&page_limit=${page_limit}
        &user_type=${user_type}&image_type=${image_type}&sort_data=${JSON.stringify(sort_data)}
        `;
      setPageDataLoading(true);
      processedData = await fetchPaginatedData(new_url);
      if (processedData) {
        processedData.data = processedData.data ? processedData.data : [];
      }
      setPageDataLoading(false);
    }

    return processedData;
  };

  useMemo(async () => {
    const tableInfo = await processImageDataList();
    console.log("table_info: ", tableInfo)
    if (tableInfo) {
      setPageData(tableInfo.data ? tableInfo.data : []);
      setPageNumber(tableInfo.page_no);
      setPageCount(tableInfo.total_pages);
      setTotalDataCount(tableInfo.total_items);
    }
  }, [fetch_url, data, page_limit, page_no, sort_data]);

  // According to fetched page_count, build page_count_series
  useMemo(() => {
    // console.log("page_no: ", pageNumber, "page_limit: ", page_limit, "page_Count: ", pageCount);
    const seriesData = calculatePageSeries(pageNumber, pageCount);
    // seriesData = calculatePageSeries(2, 6);
    if (seriesData) {
      setPageCountSeries(seriesData.page_no_series);
      setPageCurrentSeries(seriesData.current_series);
    }
  }, [pageNumber, page_limit, pageCount]);

  return {
    page_data: pageData,
    data_loading: pageDataLoading,
    page_count: pageCount,
    page_current_series: pageCurrentSeries,
    page_count_series: pageCountSeries,
    total_data_count: totalDataCount,
    page_no: pageNumber,
  };
};

export default useFetchImageDataList;
