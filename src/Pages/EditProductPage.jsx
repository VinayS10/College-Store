import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams  } from "react-router-dom";
import Navbar from "../components/Navbar";
import Category from "../components/Category";
import Sidebar from "../components/Sidebar";

const EditProductPage = () => {
  const navigate = useNavigate();
  const p = useParams()

  const [name, setname] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [image1, setimage1] = useState("");
  const [image2, setimage2] = useState("");
  const [oimage1, setoimage1] = useState("");
  const [oimage2, setoimage2] = useState("");


  useEffect(() => {
    const url = 'http://localhost:3000/product/' + p.productId;
    axios.get(url).then((result) => {
        if (result.data.product) {
            // setproduct(result.data.product)
            // console.log(result.data.product)
            const prod = result.data.product;
            setname(prod.name);
            setcategory(prod.category);
            setprice(prod.price);
            setdescription(prod.description);
            setoimage1(prod.image1);
            setoimage2(prod.image2);
        }
    }).catch((err) => {
      console.log(err);
      alert('Server error');
    })
  },[])

  const handleApi = () => {
    const formdata = new FormData();
    formdata.append("pid", p.productId);
    formdata.append("name", name);
    formdata.append("category", category);
    formdata.append("price", price);
    formdata.append("description", description);
    formdata.append("image1", image1);
    formdata.append("image2", image2);
    formdata.append("userId",localStorage.getItem("userId"));
    console.log(formdata);

    const url = "http://localhost:3000/editproduct";

    axios.post(url, formdata)
    .then((result) => {
    //   console.log(result);
      if(result.data.message){
          alert(result.data.message);
          navigate('/myproducts')
      }})
      .catch((err) => {
            alert('Server error');
        })
  };

  return (
    <>
        <Navbar/>
        <Category/>
        <Sidebar/>
        <div className='mt-[10rem] ml-[10rem]  flex justify-center'>
            <div className=" relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Edit Product
                    </h3>
                    <Link to="/">
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="top-left-modal"
                    >
                        <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                        >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    </Link>
                </div>
                <div>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                        <div className="mb-2 ">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                            setname(e.target.value);
                            }}
                            name="name"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Type product name"
                            required=""
                        />
                        </div>
                        <div className="mb-2 ">
                        <label
                            htmlFor="category"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Category
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => {
                            setcategory(e.target.value);
                            }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                            <option selected="">Select category</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Stationery">Stationery</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Books">Books</option>
                            <option value="Cycle">Cycle</option>
                            <option value="Others">Others</option>
                        </select>
                        </div>
                        <div className="mb-2 ">
                        <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Price
                        </label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => {
                            setprice(e.target.value);
                            }}
                            name="price"
                            id="price"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Rs.2999"
                            required=""
                        />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-5 text-sm font-medium text-gray-900 dark:text-white">
                            Product Image
                        </label>
                        <div className="flex justify-center mb-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Upload Image 1</label>
                                <input onChange={(e) => {
                                    setimage1(e.target.files[0]);
                                }} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                            </div>
                            <div>
                                <img width="180px"
                                    className="p-2 rounded-t-lg"
                                    src={"http://localhost:3000/" + oimage1}
                                    alt="product image"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Upload Image 2</label>
                                <input onChange={(e) => {
                                    setimage2(e.target.files[0]);
                                }} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                            </div>
                            <div>
                                <img width="180px"
                                    className="p-2 rounded-t-lg"
                                    src={"http://localhost:3000/" + oimage2}
                                    alt="product image"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                        Description
                        </label>
                        <textarea
                        value={description}
                        onChange={(e) => {
                            setdescription(e.target.value);
                        }}
                        id="description"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Write product description here"
                        defaultValue={""}
                        />
                    </div>
                    </div>
                    <button
                    onClick={handleApi}
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Update product
                    </button>
                    </div>
                </div>
            </div>
      </div>
    </>
  );
};

export default EditProductPage