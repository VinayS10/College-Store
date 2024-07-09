import React from 'react'
import Navbar from '../components/Navbar'
import Category from '../components/Category'
import EditProfile from '../components/EditProfile'
import Sidebar from '../components/Sidebar'

const EditProfilePage = () => {
  return (
    <>
        <Navbar/>
        <Category/>
        <Sidebar/>
        <EditProfile/>
    </>
  )
}

export default EditProfilePage