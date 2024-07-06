import React from 'react'
import SellItem from '../components/SellItem'
import Navbar from '../components/Navbar'
import Category from '../components/Category'

const SellItemPage = () => {
  return (
    <>
        <Navbar/>
        <Category/>
        <div className='mt-[8rem] flex justify-center'>
            <div></div>
            <SellItem/>
            <div></div>
        </div>
        
    </>
  )
}

export default SellItemPage