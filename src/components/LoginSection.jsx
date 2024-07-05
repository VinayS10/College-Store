import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const LoginSection = () => {
    const navigate = useNavigate()
    const [username, setusername] = useState()
    const [password, setpassword] = useState()

    const handleApi = () => {
        console.log({ username, password });
        const url = 'http://localhost:3000/login'
        const data = {username, password}
        axios.post(url, data)
        .then((res) => {
            console.log(res.data);
            if(res.data.message) {
                if(res.data.token) {
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('userId', res.data.userId)
                    navigate('/')
                }
                alert(res.data.message);
            }
        }) 
        .catch((err) => {
            console.log(err);
            alert('Server error')
        })
    }


  return (
    <div className='mt-[8rem]'>
        <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                            LOGIN
            </label>
        </div>
            <div className="max-w-sm mx-auto bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <div className="mb-5 ">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Username
                    </label>
                    <input
                        type="text"
                        value= {username}
                        onChange={(e) => {
                            setusername(e.target.value);
                        }}
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="abc"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setpassword(e.target.value);
                        }}            
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        placeholder='***'
                    />
                </div>
                <div className='flex item-center gap-6 justify-center'>
                    <button onClick={handleApi} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Login
                    </button>
                   
                </div>
            </div>
        </div>
  )
}

export default LoginSection