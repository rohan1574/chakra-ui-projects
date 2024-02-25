import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  WrapItem,
} from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { ChevronDownCircle } from 'lucide-react';

const Navbar = () => {
  return (
    
    <div className=''>
      
      <Popover>

        <PopoverTrigger>
          <WrapItem>
           <div > <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' /></div>
            <div className=''>
              <p className=' text-blue-400 text-[16px] ml-2 '>John Doe</p>
              <p className='text-[14px] ml-2 -mt-2'>Admin</p>
            </div>
           <div className='mt-2  bg-gray-300 rounded-full  '>  <ChevronDownCircle />
           </div>

          </WrapItem>

        </PopoverTrigger>
        <div>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <div  className='bg-white'>
            <PopoverHeader>Profile</PopoverHeader>
            <hr className='bg-black'></hr>
            <PopoverBody>Login</PopoverBody>
            </div>
          </PopoverContent>
        </div>
      </Popover>
    </div>
  );
};

export default Navbar;