import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AlignJustify, AudioLines, ChevronDown, ChevronDownCircle, ChevronDownIcon, Tv2, UsersRound } from "lucide-react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Avatar,
} from '@chakra-ui/react'
import img from '../img/1.jpg'
import TanstaskTable from "./TanstaskTable";

const Sidebar = () => {
  const menus = [
    { name: "People Management", link: "/", icon: <UsersRound /> },
    { name: "System", link: "/system", icon: <Tv2 /> },
    { name: "Configuration", link: "/config", icon: <AudioLines /> },
  ];

  const [open, setOpen] = useState(true);


  return (
    <section>
      <div className="flex bg-gray-100">
        <div
          className={`bg-[#00173C] min-h-screen ${open ? "w-72" : "w-16"
            } duration-500 text-gray-100 px-4 z-50`}
        >
          <div className="py-3 flex justify-around relative">

            <div
              className={`  cursor-pointer flex items-center ${open ? "flex gap-16 items-start " : ""}`}
              onClick={() => setOpen(!open)}
            >
              {open && (<div className={`${open ? ' font-bold text-[20px]' : ''}`}>LOREM GF</div>)}

              <AlignJustify
                size={26}
                className="cursor-pointer "
                onClick={() => setOpen(!open)}
              />

            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4 relative mr-2">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={`group flex  items-center text-sm gap-3.5 font-medium p-2 rounded-md ${
                  open ? "lg:hover:bg-blue-900" : "" // Apply hover effect only when dropdown is not open
                }`}
              >
                <div> {menu?.icon}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full ">
          {/* This is where you can place your navbar content */}
          <nav className="bg-white w-full h-16 flex items-center justify-between px-5 py-4 text-white ">
            <div className="ml-4"><Outlet></Outlet> </div>
            <ul className="flex items-center gap-4">
              <Menu>
                <MenuButton className="" >
                <div className='flex'>  
                <div><Avatar className='' src={img} /></div>
              <div>
              <div> 
                <p className=' text-blue-600 text-[16px] ml-2 font-bold mb-2'>John Doe</p>
                  <p className='text-gray-300 text-[14px] -ml-5 -mt-2'>Admin</p></div>
                  </div>
                <div className=' flex items-center text-gray-300 bg-gray-200 h-6 w-6 rounded-full mt-2 ml-2'>
                <ChevronDown />  
                </div>
              </div>
                
                  
                
                </MenuButton>
                <MenuList>
                  <MenuItem>Download</MenuItem>
                  <MenuItem>Create a Copy</MenuItem>
                  <MenuItem>Mark as Draft</MenuItem>
                  <MenuItem>Delete</MenuItem>
                  <MenuItem>Attend a Workshop</MenuItem>
                </MenuList>
              </Menu>
            </ul>
          </nav>
          <div className="p-7 ">
         <TanstaskTable></TanstaskTable>
        </div>
        </div>
        
      </div>
      
    </section>
  );
};

export default Sidebar;
