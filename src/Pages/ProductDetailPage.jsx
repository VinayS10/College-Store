import React from 'react'
import Navbar from '../components/Navbar'
import Category from '../components/Category'
import ProductDetails from '../components/ProductDetails'
import Sidebar from '../components/Sidebar'

const ProductDetailPage = () => {
  return (
    <>
        <Navbar/>
        <Category/>
        <Sidebar/>
        <div className='mt-[8rem]'>       
            <ProductDetails/>
        </div>
    </>
  )
}

export default ProductDetailPage