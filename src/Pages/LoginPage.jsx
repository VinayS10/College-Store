import React from 'react'
import LoginSection from '../components/LoginSection';
import Navbar from '../components/Navbar';
import Category from '../components/Category';
import Sidebar from '../components/Sidebar';
const LoginPage = () => {
  return (
    <>
        <Navbar/>
        <Category/>
        <Sidebar/>
        <LoginSection/>
    </>
  )
}

export default LoginPage