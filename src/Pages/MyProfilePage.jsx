import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Category from '../components/Category'
import { Link } from 'react-router-dom'

import axios from 'axios'

const MyProfilePage = () => {
    const [user, setuser] = useState({});

    useEffect(() => {
        const url = 'http://localhost:3000/profile/' + localStorage.getItem('userId');
        axios.get(url).then((result) => {
          console.log(result);
          if(result.data.user) {
            setuser(result.data.user);
          }
        }).catch((err) => {
          console.log(err);
          alert('Server error');
        })
      }, [])

  return (
    <>
        <Navbar/>
        <Category/>
        
        <div className='mt-[10rem]'>
        {user && 
                     
                    
    <div className="flex justify-center flex-wrap">
      <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <div className="flex justify-between mb-4 rounded-t sm:mb-5 border-b-2 border-gray-200 dark:border-gray-600">
          <div className="text-lg text-gray-900 md:text-xl dark:text-white">
            <h3 className="font-bold ">
              My Profile
            </h3>
          </div>
          <div>
          <Link to='/'><button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="readProductModal">
              <svg  className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              <span className="sr-only">Close modal</span>
            </button></Link>
          </div>
        </div>
        <div className='mb-[4rem] flex gap-20'>
            <div>
            <h5 className="text-xl mb-5 font-semibold tracking-tight text-gray-900 dark:text-white">
                        <span>Username: </span>
                      </h5>
                      
                      <h5 className="text-xl mb-5 font-semibold tracking-tight text-gray-900 dark:text-white">
                        <span>Mobile Number : </span>
                      </h5>
                      <h6 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        <span>Email : </span>
                      </h6>
            </div>
            <div>     
                        <div className="mb-5 text-blue-800 text-xl font-semibold">{user.username}</div>                     
                        <div className="mb-5 text-blue-800 text-xl font-semibold">{user.mobile}</div>
                        <div className="mb-5 text-blue-800 text-xl font-semibold">{user.email}</div>
            </div>
                     
        </div> 
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg aria-hidden="true" className="inline-flex mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
              <Link to = '/editprofile'>Edit</Link>
            </button>               
          </div>              
          {/* <button type="button" className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
            <svg aria-hidden="true" className="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            Delete
          </button> */}
        </div>
      </div>
    </div>
    }
  </div>

    </>
  )
}

export default MyProfilePage