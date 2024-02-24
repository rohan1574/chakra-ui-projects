

import React, { useEffect, useState } from "react";

import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Box, Button, FormControl, FormLabel, Icon, Input, Stack, useDisclosure } from "@chakra-ui/react";
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
import Tasktable from "./Tasktable";
import { editCard, getData, removeCard } from "../../public/localStorage";
import { Outlet } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

const TanstaskTable = () => {

  const [filtering, setfiltering] = useState('');
  const [defaultv, setDefaultv] = useState({})
  const [data, setData] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  useEffect(() => {
    setData(getData())
  }, [])
  console.log(data)

  const columns = [
    {
      accessorKey: "userName",
      header: "User Name",
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: (props) => <p> {props.getValue()}</p>
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: "roletName",
      header: "Role Name",
      cell: (props) => <p>{props.getValue()}</p>
    },
   
    {
      accessorKey: "statusName",
      header: "Status",
      cell: (props) => {
        const status = props.getValue();
        const textStyle = status === "complete" ? { color: "red" } : { color: "green" };
    
        return <p style={textStyle}>{status}</p>;
      }
    },
    {
      accessorKey: "action",
      header: "action",
      cell: (props) => <p>
        <div className="flex justify-center items-center">

          <Button onClick={onOpen}><p className="text-red-500"> <Pencil onClick={() => handleEdit(props.row.original.id)} /></p></Button>

          <Trash2 onClick={() => handleDelete(props.row.original.id)} />
        </div>
      </p>
    },

  ];
  const handleDelete = (id) => {
    console.log({ id });
    removeCard(id); // Assuming removeCard is a function that removes the card with the specified id from the data source
    // Update the data after deletion
  };
  const handleEdit = (id) => {



    console.log(`Edit button clicked for id: ${id}`);
    // Implement your edit logic here
    const data = getData()
    console.log(data)
    const findValue = data.find(p => p.id === id)
    setDefaultv(findValue)

    // document.getElementById('my_modal_1').showModal()

  };

  const handelUpdate = (e) => {
    e.preventDefault()
       const userName = e.target.user.value ||defaultv.user;
        const firstName = e.target.first.value|| defaultv.first;
        const lastName = e.target.last.value|| defaultv.last;
        const roletName = e.target.role.value|| defaultv.role;
        const statusName = e.target.status.value|| defaultv.status;
      const id = defaultv.id
      const data = { userName, firstName, lastName, roletName,id,statusName}
    editCard(data)
   
  }
  console.log(defaultv)

  const table = useReactTable({
    data,
    columns,
    state: {
      
      globalFilter:filtering
    },
    onGlobalFilterChange:setfiltering,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  console.log(table.getHeaderGroups())
  return (

    <div className="bg-gray-200">




      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}

      >
        <ModalOverlay />
        <form onSubmit={handelUpdate}>
          <ModalContent >
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6} >
              <FormControl >
                <FormLabel className={`cellWithStatus`}>First name</FormLabel>
                <Input  name='user' ref={initialRef} placeholder='First name' defaultValue={defaultv.userName} />
              </FormControl>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input  name='first' ref={initialRef} placeholder='First name' defaultValue={defaultv.firstName} />
              </FormControl>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input  name='last' ref={initialRef} placeholder='First name' defaultValue={defaultv.lastName} />
              </FormControl>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input  name='role' ref={initialRef} placeholder='First name' defaultValue={defaultv.roletName} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Last name</FormLabel>
                <select className='border border-cyan-300 '
                  id="type"
                  name='status'
                  defaultValue={defaultv?.statusName}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Completed</option>
                </select>
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

      <Box color="black" className="mb-7 ">
        {/* header text */}

        <div className="flex justify-between mt-5 ">
          <div><Outlet></Outlet></div>
          <div className="flex gap-2">
            <div className="mt-3 border ">
             <input className="bg-white text-black" placeholder="Search For People" type="text" value={filtering} onChange={(e) => setfiltering(e.target.value)} />
            </div>
            <div>
              <Tasktable></Tasktable>

            </div>
          </div>

        </div>
        <Box color="black" className="table" w={table.getTotalSize()}>

          {table.getHeaderGroups().map((headerGroup) => (
            <Box className="tr" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Box className="th" w={header.getSize()} key={header.id}>

                  {header.column.columnDef.header}
                  {header.column.getCanSort() && (
                    <Icon
                      as={SortIcon}
                      mx={3}
                      fontSize={14}
                      onClick={header.column.getToggleSortingHandler()}
                    />
                  )}
                </Box>

              ))}
            </Box>))}
          {/* middle-text */}
          {table.getRowModel().rows.map((row) => (
            <Box className="tr" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Box className="td" w={cell.column.getSize()} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Box>
              ))}
            </Box>
          ))}

        </Box>
      </Box >

    </div>


  );
};

export default TanstaskTable;