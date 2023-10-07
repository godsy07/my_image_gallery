import React from 'react'
import UserContainerLayout from '../../components/layout/UserContainerLayout'
import ImageDataList from '../../components/image-data-list/ImageDataList'
import { BASE_URL } from '../../config/config'
import { useAuth } from '../../components/auth/AuthContext'

const Dashboard = () => {
  const { authUser } = useAuth();

  return (
    <UserContainerLayout>
      <h6>My Images</h6>
      <ImageDataList
        fetch_url={`${BASE_URL}/images/get-my-paginated-images/${authUser && authUser.id}`}
      />
    </UserContainerLayout>
  )
}

export default Dashboard
