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
            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
            <div >
              <p className=' text-blue-400'>John Doe</p>
              <p className='text-xl'>Admin</p>
            </div>
           <div className='mt-5'>  <ChevronDownCircle />
           </div>

          </WrapItem>

        </PopoverTrigger>
        <div>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <div  className='bg-white'>
            <PopoverHeader>Confirmation!</PopoverHeader>
            <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
            </div>
          </PopoverContent>
        </div>
      </Popover>
    </div>
  );
};

export default Navbar;