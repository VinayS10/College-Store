import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { Card } from "flowbite-react";

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/login");
  //   }
  // }, []);

  useEffect(() => {
    const url = 'http://localhost:3000/get-product';
    axios.get(url).then((result) => {
      console.log(result);
      if (result.data.products) {
        setproducts(result.data.products)
      }
    }).catch((err) => {
      console.log(err);
      alert('Server error');
    })
  }, [])

  // const [temp_pdt, settemp_pdt] = useState([]);

  // useEffect(() => {
  //   console.log('useEffect');
  //   settemp_pdt(products);
  // }, [products]);

  return (
    <>
      <Navbar />
      <div className='mt-[5rem]'>
        {localStorage.getItem("token") &&
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <Link to="/sell">Create product</Link>
        </button>}


        {/* <div className="d-flex justify-content-center flex-wrap">
          {products && products.length>0 &&
            products.map((item, index) => {
            return(
              <div className="card m-3">
                <img width="300px" hight="200px" src={'http://localhost:3000/:'+item.image}/>
                <p className="pl-2">{item.name} | {item.category}</p>
                <h3 className="pl-2 text-danger">{item.price}</h3>
                <p className= 'pl-2 text-success'>{item.description}</p>
              </div>
            )
          })}
        </div> */}

        <div className="flex justify-center flex-wrap gap-2">
        {products && products.length > 0 && products.map((item, index) => {
            {return (
              <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img width="350px" height="200px"
                    className="p-8 rounded-t-lg"
                    src={"http://localhost:3000/" + item.image}
                    alt="product image"
                  />
                </a>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      <span>{item.name}</span> | {item.category}
                    </h5>
                    <h6 className="text-s font-semibold tracking-tight text-gray-900 dark:text-white">
                      <span>{item.description}</span>
                    </h6>
                  </a>

                  <div className=" mt-[1rem] flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      Rs.{item.price}
                    </span>
                    <button
                      // value={item} 
                      // onClick={()=>{
                      //   AddCart(item);
                      // }}
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

export default HomePage;
