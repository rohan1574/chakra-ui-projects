

import React, { useState, useEffect } from 'react';

import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Alert, AlertIcon, Box, Button, FormControl, FormLabel, Icon, Input, Stack, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import "../theme/styles";
import SortIcon from "../icons/SortIcon";


import { Outlet } from "react-router-dom";
import { Pencil, Search, Trash2 } from "lucide-react";
import styles from '../styles/modules/styles.module.scss';

import { useToast } from '@chakra-ui/react'
import MyPagination from './MyPagination'
import Tasktable from './Tasktable';
import axios from 'axios';


const TanstaskTable = () => {

  const [filtering, setfiltering] = useState('');
  const [defaultv, setDefaultv] = useState({})
  const [data, setData] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showAlert, setShowAlert] = useState(false);
  const toast = useToast();
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [errorMessage, setErrorMessage] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalItems, setTotalItems] = useState(data.length);
  // dgdhgjsdh

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: ''
  });








  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);

      return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
  }
  const debouncedGlobalFilter = useDebounce(globalFilter, 3000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');

        setData(response.data);

        // Set user data separately
        setTotalItems(response.data.length);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 500);
    return () => clearInterval(intervalId);
  }, []);

  // Function to handle saving new user data

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Access form data from the event object
      const formData = new FormData(e.target);
      
      // Create an object to hold form data
      const postData = {};
      formData.forEach((value, key) => {
        postData[key] = value;
      });
  
      // Make POST request to your API
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', postData);
  
      // Handle success, maybe show a success message
      console.log('User created successfully:', response.data);
      setData([...data, response.data]);
      setShowSuccessModal(true);
      onClose(); // Close the modal after successful submission
      // You may also want to update the user list or do any necessary actions
    } catch (error) {
      // Handle error, maybe show an error message
      console.error('Error creating user:', error);
      setErrorMessage('Failed to create user. Please try again.');
    }
  };
  

  const handleOpenModal = () => {
    onOpen();
  }


  const handlePageChange = (page) => {
    console.log("New page:", page);
    setCurrentPage(page);
  };


  // Calculate start and end indexes for the sliced data
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, totalItems);

  // Slice the data array to get the data for the current page
  const slicedData = data.slice(startIdx, endIdx);





  const columns = [
    {
      accessorKey: "name",
      header: "USER NAME",
      cell: (props) => <p className="text-[16px] ml-1"> {props.getValue()}</p>
    },
    {
      accessorKey: "username",
      header: "FIRST NAME",
      cell: (props) => <p className="text-[16px] ml-1"> {props.getValue()}</p>
    },
    {
      accessorKey: "email",
      header: "LAST NAME",
      cell: (props) => <p className="text-[16px] ml-2">{props.getValue()}</p>
    },



    {
      accessorKey: "action",
      header: "ACTION",
      cell: (props) => <p>
        <div className="flex items-center text-gray-400">
          <Button onClick={onOpen} className="bg-black rounded-full p-1 mr-2">
            <p className="text-[12px] text-gray-400 mr-3">
              <Pencil onClick={() => handleEdit(props.row.original.id)} className="w-4 h-4" />
            </p>
          </Button>
          <p>
            <Trash2 onClick={() => handleDelete(props.row.original.id)} className="w-4 h-4" />
          </p>
        </div>
      </p>

    },

  ];


  const table = useReactTable({
    data: slicedData, // Use slicedData based on current page and page size
    columns,
    state: { globalFilter: debouncedGlobalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
  });


  return (

    <div >




      <div className="">
        <div className="mb-7 ">
          {/* header text */}

          <div className="flex justify-between  ">
            <div className=""><Outlet></Outlet></div>
            <div className="flex gap-2 mb-4 -mt-5">
              <div className="mt-3 border flex text-[16px] gap-2 relative ">
                <div className="relative ">
                  <div className="absolute top-1/2 left-2 transform   -translate-y-1/2 text-gray-500">
                    <Search className="w-5 h-5 " />
                  </div>
                  <input
                    className="bg-white font-semibold border-2 border-gray-200 text-[14px] rounded-lg pl-10 py-2 "
                    placeholder="Search For People"
                    type="text"
                    value={globalFilter}
                    onChange={e => setGlobalFilter(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <div onClick={handleOpenModal} className='text-white text-[16px] bg-blue-500 px-4 rounded-lg p-2 items-center mt-3 cursor-pointer'>
                      New User
                    </div>

                    <Modal
                      initialFocusRef={initialRef}
                      finalFocusRef={finalRef}
                      isOpen={isOpen}
                      onClose={onClose}
                      className=' bg-white'
                    >
                      <ModalOverlay />
                      <form onSubmit={handleSubmit}>
                        <ModalContent className='bg-white'>
                          <ModalCloseButton onClick={onClose} className='text-red-500' />
                          <ModalBody pb={6} className="text-white ">
                            <FormControl className='border-solid border-5 border-indigo-600'>
                              <FormLabel>User name</FormLabel>
                              <Input name='name' ref={initialRef} value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder='User name' required />
                            </FormControl>
                            <FormControl className='border-solid border-5 border-indigo-600 mt-3'>
                              <FormLabel>First name</FormLabel>
                              <Input
                                name='username'
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                placeholder='First name'
                                required
                              />
                            </FormControl>
                            <FormControl className='border-solid border-5 border-indigo-600 mt-3'>
                              <FormLabel>Last name</FormLabel>
                              <Input
                                name='email'
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder='Last name'
                                required
                              />
                            </FormControl>
                            {errorMessage && (
                              <Alert status='error' mt={4}>
                                <AlertIcon />
                                {errorMessage}
                              </Alert>
                            )}
                          </ModalBody>
                          <ModalFooter>
                            <Button type="submit" colorScheme='blue' mr={3}>
                              Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                          </ModalFooter>
                        </ModalContent>
                      </form>
                    </Modal>
                  </div>
                </div>


              </div>
            </div>
          </div>

          <div className="rounded-lg border-2 border-gray-300 ">
            <div>
              {table.getHeaderGroups().map((headerGroup) => (
                <div className="grid grid-cols-4 text-[12px] font-bold text-gray-500 " key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <div className='bg-gray-200 py-4 px-7   font-bold' key={header.id}>
                      {header.column.columnDef.header}
                      {header.column.getCanSort() && (
                        <Icon
                          as={SortIcon}
                          mx={3}
                          fontSize={14}
                          onClick={header.column.getToggleSortingHandler()}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* middle-text */}

            <div className="">
              {table.getRowModel().rows.map((row) => (

                <div className={styles.tr} key={row.id}>
                  <div className="grid grid-cols-4 text-gray-500 text-[12px] font-normal  items-center justify-center ml-5 " key={row.id}>

                    {row.getVisibleCells().map((cell) => (

                      <div className={styles.td} key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>



          </div>
        </div>
        <MyPagination
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}

          handlePageChange={handlePageChange}
        />
      </div>

    </div>


  );
};

export default TanstaskTable;