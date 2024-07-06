import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import Category from "../components/Category";

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [cartproducts, setcartproducts] = useState([]);
  const [catproducts, setcatproducts] = useState([]);
  const [search, setsearch] = useState('');

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
        setcatproducts(result.data.products)
      }
    }).catch((err) => {
      console.log(err);
      alert('Server error');
    })

    const url2 = 'http://localhost:3000/cart-product';
    let data = { userId: localStorage.getItem('userId') }
    axios.post(url2, data).then((result) => {
      console.log(result);
      if (result.data.products) {
        setcartproducts(result.data.products)
      }
    }).catch((err) => {
      console.log(err);
      alert('Server error');
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
      if(value == "Clear Filters") {
        return item;
      }
      else if (item.category.toLowerCase() === (value.toLowerCase())) {
        console.log(item.name);
        return item;
      }
     })
     setcatproducts(filteredProducts);
  }

  const AddCart = (productId) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    else {
      const userId = localStorage.getItem('userId');
      console.log(productId, userId);
      const url = 'http://localhost:3000/like-product';
      const data = {userId, productId};
      axios.post(url, data)
      .then((result) => {
        console.log(result)
        if(result.data.message) {
          alert("Added to cart");
          setrefresh(!refresh);
        }
      }).catch((err) => {
        console.log(err);
        alert('Server error');
      })
    }
  }

  const RemoveCart = (productId) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    else {
      const userId = localStorage.getItem('userId');
      console.log(productId, userId);
      const url = 'http://localhost:3000/dislike-product';
      const data = {userId, productId};
      axios.post(url, data)
      .then((result) => {
        console.log(result)
        if(result.data.message) {
          alert("Removed from cart");
          setrefresh(!refresh);
        }
      }).catch((err) => {
        console.log(err);
        alert('Server error');
      })
    }
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
        {catproducts && catproducts.length == 0 && <h1>No Result Found</h1>}
        {catproducts && catproducts.length > 0 && catproducts.map((item, index) => {
            {return (
              <div key={item._id} className=" bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-800">
                <div onClick={() => handleProduct(item._id)} className="cursor-pointer">
                    <img width="340px" height="200px"
                      className="p-2 rounded-t-lg"
                      src={"http://localhost:3000/" + item.image1}
                      alt="product image"
                    />
                </div>
                <div className="px-5 pb-5">
                    <h5 className="flex justify-center text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      <span> {item.name} | {item.category}</span> 
                    </h5>
                    <h6 className="flex justify-center text-s font-semibold tracking-tight text-gray-900 dark:text-white">
                      <span>{item.description}</span>
                    </h6>

                  <div className=" mt-[1rem] flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      Rs.{item.price}
                    </span>
                    {
                      cartproducts.find((likedItem) => likedItem._id === item._id) ? <div>
                      <span className="text-red-600 text-m"> In cart </span>
                    <button value={item} onClick={()=>{RemoveCart(item._id)}} className="text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Remove
                    </button></div> :
                    <button value={item} onClick={()=>{AddCart(item._id)}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Add to Cart
                    </button>
                    }
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
