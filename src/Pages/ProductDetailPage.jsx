import React from 'react'
import Navbar from '../components/Navbar'
import Category from '../components/Category'
import ProductDetails from '../components/ProductDetails'

const ProductDetailPage = () => {
  return (
    <>
        <Navbar/>
        <Category/>
        <div className='mt-[8rem]'>
            <ProductDetails/>
        </div>
    </>
  )
}

export default ProductDetailPage