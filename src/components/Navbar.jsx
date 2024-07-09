import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import cart_icon from "../assets/cart_icon.png"


const Navbar = (props) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId')
        navigate('/login')
    }


  return (
    <>
        <nav className="bg-purple-50 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <span className="text-red-700 self-center text-3xl font-semibold whitespace-nowrap dark:text-white"><Link to='/'>COLLEGE-STORE</Link></span>

                {/* <span className="text-xl font-semibold tracking-tigh dark:text-white text-blue-800"><Link to = '/'>Home</Link></span> */}
                <div className="flex gap-3 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
{/*         
                    {localStorage.getItem("token") && <Link to="/cart"> <img src={cart_icon} alt="" /></Link>}             
                    {!localStorage.getItem('token') && <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><Link to='/login'>Login</Link></button>}
                    {localStorage.getItem("token") && <button onClick={handleLogout} type="button" className="mt-0 mr-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>}
                    {!localStorage.getItem('token') && <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><Link to='/signup'>Sign Up</Link></button>}
                    {localStorage.getItem("token") && <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><Link to="/sell">Add product</Link></button>}
                    {localStorage.getItem("token") && <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><Link to="/myproducts">User's products</Link></button>}
                    {localStorage.getItem("token") && <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><Link to="/profile">User's Profile</Link></button>} */}
                    
        

                    {/* <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button> */}
                </div>
                <div className="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-sticky">

                    <div className="relative text-gray-600 focus-within:text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                                    <path d="M21 21l-6-6M9 2a7 7 0 110 14 7 7 0 010-14z"></path>
                                </svg>
                            </button>
                        </span>
                        <input
                            type="search"
                            value={props && props.search}
                            onChange={(e) => props.handleSearch && props.handleSearch(e.target.value)}
                            name="search"
                            placeholder="Search..."
                            className="py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                        />
                        <button
                            onClick={() => props.handleClick && props.handleClick()}
                            type="button" className=" h-[42px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search

                        </button>
                    </div>

                </div>
            </div>
        </nav>


    </>
  )
}

export default Navbar