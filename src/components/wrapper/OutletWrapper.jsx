import React from 'react'
import { Outlet } from 'react-router-dom'

const OutletWrapper = (props) => {
  return (
    <Outlet {...props} />
  )
}

export default OutletWrapper
