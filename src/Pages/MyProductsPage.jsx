import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import Category from "../components/Category";

const MyProductsPage = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const [catproducts, setcatproducts] = useState([]);
  const [search, setsearch] = useState('');

  useEffect(() => {
    const url = 'http://localhost:3000/my-products';
    let data = { userId: localStorage.getItem('userId') }
        axios.post(url, data)
            .then((res) => {
                if (res.data.products) {
                    setproducts(res.data.products);
                    setcatproducts(res.data.products)
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
  }, [])

  const handleSearch = (value) => {
    console.log(value);
    setsearch(value);
  }

  const handleClick = () => {
     console.log('products', products);
     let filteredProducts = products.filter((item)=> {
      if (item.name.toLowerCase().includes(search.toLowerCase()) || item.price.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())) {
        return item;
      }
     })
     setcatproducts(filteredProducts);
  }

  const handleCategory = (value) => {
    let filteredProducts = products.filter((item)=> {
      if(value == 'Clear Filters') {
        return item;
      }
      else if (item.category.toLowerCase() === (value.toLowerCase())) {
        console.log(item.name);
        return item;
      }
     })
     setcatproducts(filteredProducts);
  }

  const handleProduct = (id) => {
    navigate('/product/' + id);
  }


  return (
    <>
      <Navbar search={search} handleSearch={handleSearch} handleClick = {handleClick}/>
      <Category handleCategory={handleCategory}/>
      <div className='mt-[10rem]'>

        <div className="flex justify-center flex-wrap gap-5">
        {catproducts && catproducts.length == 0 && <h1>No Product Added</h1>}
        {catproducts && catproducts.length > 0 && catproducts.map((item, index) => {
            {return (
              <div key={item._id} className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div onClick={() => handleProduct(item._id)} className="cursor-pointer">
                  <img width="350px" height="200px"
                    className="p-2 rounded-t-lg"
                    src={"http://localhost:3000/" + item.image1}
                    alt="product image"
                  />
                </div>
                <div className="px-5 pb-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      <span>{item.name}</span> | {item.category}
                    </h5>
                    <h6 className="text-s font-semibold tracking-tight text-gray-900 dark:text-white">
                      <span>{item.description}</span>
                    </h6>

                  <div className=" mt-[1rem] flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      Rs.{item.price}
                    </span>
                    <button
                      
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
                
              </div>
              
            )}
          })}
      </div>
      </div>
      
    </>
  );
};

export default MyProductsPage