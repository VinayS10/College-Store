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
  const [refresh, setrefresh] = useState(false);

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
  }, [refresh])

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

  const handledelete = (pid) => {
    const url = 'http://localhost:3000/deleteitem';
    const data = {pid, userId: localStorage.getItem('userId')}
    axios.post(url,data)
    .then((res) => {
          if (res.data.message) {
              alert('Item deleted successfully')
              setrefresh(!refresh)
          }
      })
      .catch((err) => {
          alert('Server Err.')
      })
  }

  const handleProduct = (id) => {
    navigate('/product/' + id);
  }

  const edithandle = (id) => {
    navigate('/editproduct/' + id);
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
                  <div className="flex justify-evenly">
                    <div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        Rs.{item.price}
                      </span>
                    </div>
                    <div>
                      <h5 className="flex justify-center text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        <span>{item.name}</span> | {item.category}
                      </h5>
                      <h6 className="flex justify-center text-s font-semibold tracking-tight text-gray-900 dark:text-white">
                        <span>{item.description}</span>
                      </h6>
                    </div>
                    
                  </div>
                  <div className=" mt-[1rem] flex items-center justify-between">
                    <button onClick={()=> edithandle(item._id)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg aria-hidden="true" className="inline-flex mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                        Edit
                      </button>                          
                    <button onClick={()=> handledelete(item._id)} type="button" className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                      <svg aria-hidden="true" className="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                      Delete
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