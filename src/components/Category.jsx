import React from 'react';


let Categories=['Clear Filters','Furniture','Stationery','Electronics','Books','Cycle'];
const Category = (props) => {
    return (
        <div className="start-0 fixed top-0 w-[100%] mt-[73px] bg-red-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-xl whitespace-nowrap dark:text-white"> All Categories</span>
                </a>
                
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-red-50 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {Categories && Categories.length>0 && Categories.map((item, index) => {
                            {return (
                                <button onClick={() => props.handleCategory && props.handleCategory(item)} key={index} className="block py-2 px-3 text-gray-900 rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                    {item}
                                </button>
                    
                            )}
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Category;
