import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import HomePage from './Pages/HomePage';
import SellItemPage from './Pages/SellItemPage';

function App() {

  return (
    <>
      {/* <Navbar/>
      <SellItem/> */}

      <BrowserRouter>
        <Routes>
        <Route  path="/" element={<HomePage/>}></Route>
        <Route  path="/login" element={<LoginPage/>}></Route>
        <Route  path="/signup" element={<RegisterPage/>}></Route>
        <Route  path="/sell" element={<SellItemPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
