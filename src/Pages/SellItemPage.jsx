import React from 'react'
import SellItem from '../components/SellItem'
import Navbar from '../components/Navbar'
import Category from '../components/Category'
import Sidebar from '../components/Sidebar'

const SellItemPage = () => {
  return (
    <>
        <Navbar />
        <Category />
        <Sidebar/>
        <div className='mt-[10rem] ml-[10rem] flex justify-center'>
        
            <SellItem/>
        </div>
        
    </>
  )
}

export default SellItemPage