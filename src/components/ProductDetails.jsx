import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import Navbar from "./Navbar";

const ProductDetails = () => {
    const p = useParams()
    console.log(p.productId)

    const [product, setproduct] = useState();
    const [user, setuser] = useState();
    console.log(user)

    useEffect(() => {
        const url = 'http://localhost:3000/product/' + p.productId;
        axios.get(url).then((result) => {
            if (result.data.product) {
                setproduct(result.data.product)
            }
        }).catch((err) => {
          console.log(err);
          alert('Server error');
        })
      },[])

      const handleContact = (addedBy) => {
        console.log(addedBy);
        const url = 'http://localhost:3000/get-user/' + addedBy;
        axios.get(url).then((result) => {
            if (result.data.user) {
                setuser(result.data.user)
            }
        }).catch((err) => {
          console.log(err);
          alert('Server error');
        })
      }

  return (
    <>
        {product && 
        <div className="flex flex-wrap">
          <div>
          <div className="mb-5 bg-white border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div >
                    <img width="400px" height="200px"
                      className="p-8 rounded-t-lg"
                      src={"http://localhost:3000/" + product.image1}
                      alt="product image"
                    />
                </div>
            </div>
            <div className=" bg-white border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div >
                    <img width="600px" height="200px"
                      className="p-8 rounded-t-lg"
                      src={"http://localhost:3000/" + product.image2}
                      alt="product image"
                    />
                </div>
            </div>
          </div>
             
                <div className="px-5 pb-5 text-left mb-6">
                    <div>
                      <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        <span>Product Name : </span>
                        <span className="text-blue-800">{product.name}</span>
                      </h5>
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        <span>Category : </span>
                        <span className="text-blue-800">{product.category}</span>
                      </h5>
                      <h6 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        <span>Description : </span>
                        <span className="text-blue-800">{product.description}</span>
                      </h6>
                      <h6 className="mb-10 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        <span>Price : </span>
                        <span className="text-blue-800">Rs.{product.price}</span>
                      </h6>
                    </div>         
                    <div className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <button onClick={() => handleContact(product.addedBy)}>Show Contact Details</button>
                    </div>
                    {user && 
                      <div>
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        <span>Seller Name : </span>
                        <span className="text-blue-800">{user.username}</span>
                      </h5>
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        <span>Mobile Number: </span>
                        <span className="text-blue-800">{user.mobile}</span>
                      </h5>
                      <h6 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        <span>Email : </span>
                        <span className="text-blue-800">{user.email}</span>
                      </h6>
                    </div> 
                    }      
                </div>
                
          </div>
      }
    </>
    

  )
}

export default ProductDetails