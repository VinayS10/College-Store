import React from 'react'
import Navbar from '../components/Navbar'
import Signup from '../components/Signup'
import Category from '../components/Category'
import Sidebar from '../components/Sidebar'

const RegisterPage = () => {
  return (
    <>
        <Navbar/>
        <Category/>
        <Sidebar/>
        <Signup/>
    </>
  )
}

export default RegisterPage