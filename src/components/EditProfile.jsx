import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'

const EditProfile = () => {
  const p = useParams()
  console.log('hello', p)
    const navigate = useNavigate()
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [mobile, setmobile] = useState("");

    useEffect(() => {
      const url = 'http://localhost:3000/profile/' + p.userId;
      axios.get(url).then((result) => {
          if (result.data.user) {
              
              const prod = result.data.user;
              setusername(prod.username);
              setemail(prod.email);
              setmobile(prod.mobile);
          }
      }).catch((err) => {
        console.log(err);
        alert('Server error');
      })
    },[])

    const handleApi = () => {
      const formdata = new FormData();
      formdata.append("uid", p.userId);
      formdata.append("username", username);
      formdata.append("mobile", mobile);
      formdata.append("email", email);
      
      const url = "http://localhost:3000/editprofile";
      axios.post(url, formdata)
      .then((result) => {
          console.log(email);
          console.log(result);
          if(result.data.message){
              alert(result.data.message);
              navigate('/profile');
          }
      })
      .catch((err) => {
          console.log(err);
          alert('Server error');
      });
  }

    
  return (
  <>
        <div className='mt-[10rem]'>                  
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
            <div>   <input
                        type="text"
                        value= {username}
                        onChange={(e) => {
                            setusername(e.target.value);
                        }}
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="abc"
                        required
                    />
                    <input
                        type="text"
                        value= {mobile}
                        onChange={(e) => {
                            setmobile(e.target.value);
                        }}
                        id="mobile"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="9810******"
                        required
                    />
                    <input
                        type="text"
                        value= {email}
                        onChange={(e) => {
                            setemail(e.target.value);
                        }}
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="abc@gmail.com"
                        required
                    />

            </div>
                     
        </div> 
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button onClick={handleApi} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg aria-hidden="true" className="inline-flex mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
              Save
            </button>               
          </div>              
        </div>
      </div>
    </div>
    
  </div>
  </>
  )
}

export default EditProfile