

import React, { useState, useEffect } from 'react';

import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Alert, AlertIcon, Box, Button, FormControl, FormLabel, Icon, Input, Stack, Textarea, useDisclosure } from "@chakra-ui/react";
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
import axios from 'axios';
const TanstaskTable = () => {
  const [data, setData] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
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
  const [formData, setFormData] = useState({
    userId: "",
    id: "",
    title: "",
    body: "",
  });
  const { userId, id, title, body } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const [editingItemId, setEditingItemId] = useState(null);
const handleEdit = (id) => {
  setEditingItemId(id);
  const selectedItem = data.find(item => item.id === id);
  setFormData({
    userId: selectedItem.userId,
    id: selectedItem.id,
    title: selectedItem.title,
    body: selectedItem.body,
  });
  onOpen(); // Open the modal
};
// Update handleSubmit to handle both add and edit operations
const handleSubmit = (e) => {
  e.preventDefault();
  if (userId && title && body) {
    const newItem = { userId, id, title, body };
    if (editingItemId) {
      axios.put(`https://jsonplaceholder.typicode.com/posts/${editingItemId}`, newItem)
        .then(res => {
          const updatedData = data.map(item => item.id === editingItemId ? newItem : item);
          setData(updatedData);
          setEditingItemId(null); 
          setShowSuccessModal(true);
          onClose();
        })
        .catch(err => console.log(err));
    } else {
      axios.post('https://jsonplaceholder.typicode.com/posts', newItem)
        .then(res => {
          const newData = [...data, res.data];
          setData(newData);
          setTotalItems(newData.length);
          setFormData({ userId: "", id: "", title: "", body: "" });
          setShowSuccessModal(true);
          onClose();
        })
        .catch(err => console.log(err));
    }
  }
};
const handleOpenModal = () => {
  setFormData({ userId: "", id: "", title: "", body: "" });
  setEditingItemId(null); 
  onOpen();
};

useEffect(() => {
  axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => {
      setData(res.data); 
      setTotalItems(res.data.length); 
    })
    .catch(err => console.log(err));
}, [globalFilter, currentPage, pageSize]);
  const handleDelete = (id) => {
    setShowDeleteConfirmation(true); 
    setDeleteItemId(id); 
  };
  const confirmDelete = () => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${deleteItemId}`)
      .then(response => {
        // Handle success, e.g., remove the deleted item from state
        const updatedData = data.filter(item => item.id !== deleteItemId);
        setData(updatedData);
        setShowDeleteConfirmation(false); // Close the confirmation modal
        toast({
          title: "Item deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(error => {
        // Handle error
        console.error('Error deleting item:', error);
        toast({
          title: "Error",
          description: "Failed to delete item",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  const cancelDelete = () => {
    setShowDeleteConfirmation(false); 
  };
  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
  }
  const debouncedGlobalFilter = useDebounce(globalFilter, 3000);
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
      accessorKey: "userId",
      header: "USER Id",
      cell: (props) => <p className="text-[16px] ml-1"> {props.getValue()}</p>
    },
    {
      accessorKey: "id",
      header: "Id NAME",
      cell: (props) => <p className="text-[16px] ml-1"> {props.getValue()}</p>
    },
    {
      accessorKey: "title",
      header: "TITLE NAME",
      cell: (props) => <p className="text-[16px] ml-1"> {props.getValue()}</p>
    },
    {
      accessorKey: "body",
      header: "BODY NAME",
      cell: (props) => <p className="text-[16px] ml-2">{props.getValue()}</p>
    },
    {
      accessorKey: "action",
      header: "ACTION",
      cell: (props) => <p>
        <div className="flex items-center text-gray-400">
          <Button className="bg-black rounded-full p-1 mr-2">
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
      {showDeleteConfirmation && (
        <Modal isOpen={showDeleteConfirmation} onClose={cancelDelete}>
          <ModalOverlay />
          <ModalContent className="bg-blue-500">
            <ModalHeader className="text-white">Delete Confirmation</ModalHeader>
            <ModalCloseButton className="text-red-500" />
            <ModalBody className="text-white">
              Are you sure you want to delete this item?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={confirmDelete}>
                Delete
              </Button>
              <Button onClick={cancelDelete}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
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
                              <FormLabel>User ID</FormLabel>
                              <Input type="text"
                                className="form-control"
                                id="userId"
                                placeholder="Enter user id"
                                name="userId"
                                value={userId}
                                onChange={handleChange} required />
                            </FormControl>
                            <FormControl className='border-solid border-5 border-indigo-600 mt-3'>
                              <FormLabel>Id Name</FormLabel>
                              <Input
                                type="text"
                                className="form-control"
                                id="id"
                                placeholder="Enter id"
                                name="id"
                                value={id}
                                onChange={handleChange}
                                required
                              />
                            </FormControl>
                            <FormControl className='border-solid border-5 border-indigo-600 mt-3'>
                              <FormLabel>Title Name</FormLabel>
                              <Input
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="Enter title"
                                name="title"
                                value={title}
                                onChange={handleChange}
                                required
                              />
                            </FormControl>
                            <FormControl className='border-solid border-5 border-indigo-600 mt-3'>
                              <FormLabel>Body Name</FormLabel>
                              <Input
                                className="form-control"
                                id="body"
                                rows="3"
                                placeholder="Enter body"
                                name="body"
                                value={body}
                                onChange={handleChange}
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
                <div className="grid grid-cols-5 text-[12px] font-bold text-gray-500 " key={headerGroup.id}>
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
                  <div className="grid grid-cols-5 text-gray-500 text-[12px] font-normal  items-center justify-center ml-5 " key={row.id}>
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