

import React, { useState, useEffect } from 'react';

import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable,getPaginationRowModel } from '@tanstack/react-table';
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
import SortIcon from "./SortIcon";
import Tasktable from "./Tasktable";
import { editCard, getData, removeCard } from "../../public/localStorage";
import { Outlet } from "react-router-dom";
import { Pencil, Search, Trash2 } from "lucide-react";
import styles from '../styles/modules/styles.module.scss';
import { Select } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'


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

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })
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
      const dataFromStorage = getData();
      setData(dataFromStorage);
    };

    fetchData();


    const intervalId = setInterval(fetchData, 500);


    return () => clearInterval(intervalId);
  }, []);




  const columns = [
    {
      accessorKey: "userName",
      header: "USER NAME",
      cell: (props) => <p className="text-[16px] ">{props.getValue()}</p>
    },
    {
      accessorKey: "firstName",
      header: "FIRST NAME",
      cell: (props) => <p className="text-[16px] ml-1"> {props.getValue()}</p>
    },
    {
      accessorKey: "lastName",
      header: "LAST NAME",
      cell: (props) => <p className="text-[16px] ml-2">{props.getValue()}</p>
    },
    {
      accessorKey: "roletName",
      header: "ROLE",
      cell: (props) => <p className="text-[16px] ml-2">{props.getValue()}</p>
    },

    {
      accessorKey: "statusName",
      header: "STATE",
      cell: (props) => {
        const status = props.getValue();

        const textStyle = status === "Active" ? { background: "green" } : { background: "red" };

        return <div className="flex text-[16px] items-center gap-3 ml-4">
          <p className="flex items-center border-0 rounded-full justify-center  p-0  w-3 h-3" style={textStyle}> </p>
          <p>{status}</p>
        </div>

      }
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
  const handleDelete = (id) => {
    setShowDeleteConfirmation(true);
    setDeleteItemId(id);
  };

  const confirmDelete = () => {
    removeCard(deleteItemId);
    setShowDeleteConfirmation(false);
    // After deletion, you might want to refresh your data
    const updatedData = data.filter(item => item.id !== deleteItemId);
    setData(updatedData);
    toast({
      title: "User Deleted",
      description: "User has been deleted successfully.",
      status: "success",
      duration: 3000, // Toast will automatically disappear after 3 seconds
      isClosable: true,
      position: "top", // Display toast at the top
    });
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };
  const handleEdit = (id) => {

    const data = getData()
    console.log(data)
    const findValue = data.find(p => p.id === id)
    setDefaultv(findValue)

  };

  const handelUpdate = (e) => {
    e.preventDefault();
    // Flag to track if any field is invalid

    const userName = e.target.user.value || defaultv.user;
    if (!userName || userName.length < 2) {
      setErrorMessage("All UserName must contain  two characters.");
      return;
    }

    const firstName = e.target.first.value || defaultv.first;
    if (!firstName || firstName.length < 2) {
      setErrorMessage("All FirstName must contain two characters.");
      return;
    }

    const lastName = e.target.last.value || defaultv.last;
    if (!lastName || lastName.length < 2) {
      setErrorMessage("All lastName must contain  two characters.");
      return;
    }

    const roletName = e.target.role.value || defaultv.role;
    if (!roletName || roletName.length < 2) {
      setErrorMessage("All roleName must contain  two characters.");
      return;
    }

    const statusName = e.target.status.value || defaultv.status;
    const id = defaultv.id;
    const data = { userName, firstName, lastName, roletName, id, statusName };
    setShowSuccessModal(true);

    toast({
      title: "User Update Created",
      description: "User has been update created successfully.",
      status: "success",
      duration: 3000, // Toast will automatically disappear after 3 seconds
      isClosable: true,
      position: "top", // Display toast at the top
    });

    editCard(data);
    setShowAlert(false);
    onClose();

  }

  const table = useReactTable({
    data,
    columns,
    debugTable: false,
    state: { globalFilter: debouncedGlobalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false, 
    onPaginationChange: setPagination,
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      pagination,
    },
    
  });

  return (

    <div >

      {/* delete button show */}
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

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}

      >

        <ModalOverlay />
        <form onSubmit={handelUpdate}>
          <ModalContent>
            <ModalCloseButton onClick={onClose} className='text-red-500' />
            <ModalBody pb={6} className="text-white">
              <FormControl className='border-solid border-5 border-indigo-600 mt-3'>
                <FormLabel className={`cellWithStatus`}>User name</FormLabel>
                <Input
                  className="text-white"
                  name='user'
                  ref={initialRef}
                  placeholder='User name'
                  defaultValue={defaultv.userName}
                  required // Make the input required
                  isInvalid={defaultv.user && !isInputValid(defaultv.user)}
                />
              </FormControl>
              <FormControl className='border-solid border-5 border-indigo-600 mt-3'>
                <FormLabel>First name</FormLabel>
                <Input
                  className="text-white"
                  name='first'

                  placeholder='First name'
                  defaultValue={defaultv.firstName}
                  required // Make the input required
                  isInvalid={defaultv.first && !isInputValid(defaultv.first)}
                />
              </FormControl>
              <FormControl className='border-solid border-5 border-indigo-600 mt-3'>
                <FormLabel>Last name</FormLabel>
                <Input
                  className="text-white"
                  name='last'

                  placeholder='Last name'
                  defaultValue={defaultv.lastName}
                  required // Make the input required
                  isInvalid={defaultv.last && !isInputValid(defaultv.last)}
                />

              </FormControl>
              <FormControl className='border-solid border-5 border-indigo-600 mt-3'>
                <FormLabel>Role name</FormLabel>
                <Input
                  className="text-white"
                  name='role'

                  placeholder='Role name'
                  defaultValue={defaultv.roletName}
                  required
                  isInvalid={defaultv.role && !isInputValid(defaultv.role)}
                />

              </FormControl>
              {errorMessage && (
                <Alert status='error' mt={4}>
                  <AlertIcon />
                  {errorMessage}
                </Alert>
              )}
              <FormControl mt={4} className='border-solid border-5 border-indigo-600 '>
                <FormLabel>Status name</FormLabel>
                <Select className='border border-cyan-300 text-white' placeholder='Select option' id="type"
                  name='status'
                  defaultValue={defaultv?.statusName} required>
                  <option value="Active">Active</option>
                  <option value="Disabled">Disabled</option>
                </Select>

              </FormControl>
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
                <Tasktable></Tasktable>
              </div>
            </div>
          </div>

          <div className="rounded-lg border-2 border-gray-300 ">
            <div>
              {table.getHeaderGroups().map((headerGroup) => (
                <div className="grid grid-cols-6 text-[12px] font-bold text-gray-500 " key={headerGroup.id}>
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
                  <div className="grid grid-cols-6 text-gray-500 text-[12px] font-normal  items-center justify-center ml-5 " key={row.id}>

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

        

      </div>
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            
            className="border p-1 rounded bg-blue-500 w-16"
          />
          
        </span>
        <select
         className="border p-1 rounded bg-blue-500 w-30"
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              
              Show {pageSize}
              
            </option>
            
          ))}
        </select>
      </div>
      <div></div>

    </div>


  );
};

export default TanstaskTable;