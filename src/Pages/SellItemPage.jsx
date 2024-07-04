import React from 'react'
import SellItem from '../components/SellItem'
import Navbar from '../components/Navbar'

const SellItemPage = () => {
  return (
    <>
        <Navbar/>
        <div className='mt-[3rem] flex justify-between items-center'>
            <div></div>
            <SellItem/>
            <div></div>
        </div>
        
    </>
  )
}

export default SellItemPage