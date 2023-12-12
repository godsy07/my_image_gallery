import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { BASE_URL } from '../../config/config'
import ImageDataList from '../../components/image-data-list/ImageDataList'
import UserContainerLayout from '../../components/layout/UserContainerLayout'

const PendingImages = () => {
    const [fetchCount, setFetchCount] = useState(1);
  return (
    <>
      <UserContainerLayout>
        <h5 className='text-center'>Pednding Images</h5>
        <div className='mx-2 p-1 d-flex justify-content-end'>
          <Button className='me-1' onClick={() => console.log("Approve all images")}>&nbsp;Approve All</Button>
          <Button variant='danger' onClick={() => console.log("Reject all images")}>&nbsp;Reject All</Button>
        </div>
        <ImageDataList
          fetch_count={fetchCount}
          refreshFetchURL={() => setFetchCount(fetchCount + 1)}
          fetch_url={`${BASE_URL}/images/get-paginated-images`}
        />
      </UserContainerLayout>
    </>
  )
}

export default PendingImages