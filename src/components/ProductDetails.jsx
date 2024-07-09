import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const ProductDetails = () => {
    const p = useParams()

    const [product, setproduct] = useState();
    const [user, setuser] = useState();
    const [msg, setmsg] = useState();
    let [msgs, setmsgs] = useState([]);

    
    useEffect(() => {
      socket.on('connect', () => {
          console.log('con')
      })
      return () => {
          socket.off()
      }

  }, [])
    
    useEffect(() => {
        socket.on('getMsg', (data) => {
            const _data = data.filter((item, index) => {
                return item.productId == p.productId
            })
            setmsgs(_data)
        })
    }, [p.productId])

    useEffect(() => {
        const url = 'http://localhost:3000/product/' + p.productId;
        axios.get(url).then((result) => {
            if (result.data.product) {
                setproduct(result.data.product)
            }
        }).catch((err) => {
          alert('Server error');
        })
      },[])

      const handleContact = (addedBy) => {
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

      const handleSend = () => {

        const data = { username: localStorage.getItem('username'), msg, productId : p.productId }
        console.log(data, "data send")
        socket.emit('sendmsg', data)
        setmsg('')
    }

  return (
    <>
      
        {product && 
        <div className="ml-[15rem] mt-[10rem] flex justify-center p-8 flex-wrap">
          <div>
            <div className="mb-5 bg-white border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div >
                    <img width="500px" height="200px"
                      className="p-4 rounded-t-lg"
                      src={"http://localhost:3000/" + product.image1}
                      alt="product image"
                    />
                </div>
            </div>
            <div className=" bg-white border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div >
                    <img width="500px" height="200px"
                      className="p-4 rounded-t-lg"
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
                      <button onClick={() => handleContact(product.addedBy)}>Seller Contact Details</button>
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
                <div>
                <span className="text-2xl font-semibold tracking-tight justify-center text-gray-900 dark:text-white">Chats</span>

                  <div className="h-2/6 w-150 overflow-x-scroll bg-white shadow-md">
                    {
                      msgs && msgs.length > 0 && msgs.map((item, index) => {{
                        if(item.username==localStorage.getItem('username')) {
                          return (
                            <div className="mb-2 ml-20 flex flex-col w-full max-w-[320px] leading-1.5 p-1 border-gray-200 bg-green-600 rounded-se-xl rounded-s-xl dark:bg-gray-700">
                              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <span className="text-sm font-bold text-white dark:text-white">{item.username} : </span>
                                <p className="text-sm font-normal py-2.5 text-white dark:text-white">{item.msg}</p>
                              </div>
                              
                            </div>
                            
                          )
                        }
                        else {
                          return (
                            <div className="mb-2 mr-20 flex flex-col w-full max-w-[320px] leading-1.5 p-1 border-gray-200 bg-yellow-500 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <span className="text-sm font-bold text-white dark:text-white">{item.username} : </span>
                                <p className="text-sm font-normal py-2.5 text-white dark:text-white">{item.msg}</p>
                              </div>
                              
                            </div>
                            
                          )
                        }
                    }})
                    }
                    <div className=" absolute bottom-0 y-100 bg-white text-white p-4">
                      <input value={msg} onChange={(e) => setmsg(e.target.value)} type="text" className="bg-gray-50 w-96 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type here"/>
                      <button onClick={handleSend} className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
                    </div>
                    
                  </div>
                </div>
                
          </div>
      }
    </>
    

  )
}

export default ProductDetails