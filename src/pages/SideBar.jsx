import { AudioLines, Tv2, UsersRound } from 'lucide-react';
import React from 'react';


const SideBar = ({sideToggle}) => {
  
    return (
        <div className={`${sideToggle ? "hidden" : "block"} w-60 bg-gray-800 fixed h-full px-4 py-2`}>
            <div className='my-2 mb-4'>
                <h1 className='text-2xl text-white  font-bold'>Lorem</h1>
                <hr />
               <ul className='mt-3 text-white font-bold '>
                <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                    <a href="" className='px-3'>
                       <AudioLines className='inline-block w-6 h-6 mr-2 -mt-2'></AudioLines> Home
                    </a>
                </li>
                <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                    <a href="" className='px-3'>
                       <AudioLines className='inline-block w-6 h-6 mr-2 -mt-2'></AudioLines> Home
                    </a>
                </li>
                <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                    <a href="" className='px-3'>
                       <AudioLines className='inline-block w-6 h-6 mr-2 -mt-2'></AudioLines> Home
                    </a>
                </li>
               </ul>
            </div>
        </div>
    );
};

export default SideBar;