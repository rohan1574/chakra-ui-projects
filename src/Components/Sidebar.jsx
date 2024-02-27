import React, { useState } from "react";

import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

import TanstaskTable from "./TanstaskTable";
import { AlignJustify, AudioLines, Tv2, UsersRound } from "lucide-react";



const Sidebar = () => {
  const menus = [
    { name: "People Management", link: "/", icon: <UsersRound /> },
    { name: "System", link: "/system", icon: <Tv2 /> },
    { name: "Configuration", link: "/config", icon: <AudioLines /> },

  ];
  const [open, setOpen] = useState(true);
  return (
    <section >
      <div className="flex  bg-gray-100 ">
        <div
          className={`bg-[#00173C] min-h-screen ${open ? "w-72" : "w-16"
            } duration-500 text-gray-100 px-4`}
        >
          <div className="py-3 flex justify-around ">
            <div>
              LOREM GF
            </div>
            <div>
              <AlignJustify
                size={26}
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            </div>

          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={` ${menu?.margin && "mt-5"
                  } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
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
                  className={`${open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>

              </Link>
            ))}
          </div>
        </div>

        <div className="m-3 text-xl  text-gray-900 font-semibold -ml-0 mt-0 ">

          <div className="flex justify-between items-end p-3  bg-white rounded-lg -mr-24">
            <div className=""><Outlet></Outlet></div>
            <div className=""> <Navbar></Navbar></div>
          </div>



          <div className="ml-24"><TanstaskTable></TanstaskTable></div>
        </div>
      </div>

    </section>
  );
};

export default Sidebar;