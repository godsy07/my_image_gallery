import React from 'react'
import { BASE_URL } from '../../config/config'
import { useAuth } from '../../components/auth/AuthContext'
import ImageDataList from '../../components/image-data-list/ImageDataList'
import UserContainerLayout from '../../components/layout/UserContainerLayout'

const Dashboard = () => {
  const { authUser } = useAuth();

  return (
    <UserContainerLayout>
      <h5 className='text-center'>My Uploads</h5>
      <ImageDataList
        fetch_url={`${BASE_URL}/images/get-my-paginated-images/${authUser && authUser.id}`}
      />
    </UserContainerLayout>
  )
}

export default Dashboard
