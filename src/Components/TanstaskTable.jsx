

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
import { Pencil, Search, Trash2 } from "lucide-react";
import styles from './styles.module.scss';
import { debounce } from "lodash";

const TanstaskTable = () => {

  const [filtering, setfiltering] = useState('');
  const [defaultv, setDefaultv] = useState({})
  const [data, setData] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const debouncedSetFiltering = debounce((value) => {
    setfiltering(value);
  }, 2000); 

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
      header: "User Name",
      cell: (props) => <p className="text-[16px]">{props.getValue()}</p>
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: (props) => <p className="text-[16px]"> {props.getValue()}</p>
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: (props) => <p className="text-[16px]">{props.getValue()}</p>
    },
    {
      accessorKey: "roletName",
      header: "Role Name",
      cell: (props) => <p className="text-[16px]">{props.getValue()}</p>
    },

    {
      accessorKey: "statusName",
      header: "Status",
      cell: (props) => {
        const status = props.getValue();

        const textStyle = status === "Active" ? { background: "green" } : { background: "red" };

        return <div className="flex text-[16px] items-center gap-3">
          <p className="flex items-center border-0 rounded-full justify-center  p-0  w-3 h-3" style={textStyle}> </p>
          <p>{status}</p>
        </div>

      }
    },
    {
      accessorKey: "action",
      header: "action",
      cell: (props) => <p>
        <div className="flex  items-center text-[12px] text-gray-400">

          <Button onClick={onOpen}><p className="text-gray-400 text-[12px]"> <Pencil onClick={() => handleEdit(props.row.original.id)} /></p></Button>
          <p  ><Trash2 onClick={() => handleDelete(props.row.original.id)} /></p>

        </div>
      </p>
    },

  ];
  const handleDelete = (id) => {
    console.log({ id });
    removeCard(id); 
  };
  const handleEdit = (id) => {

    const data = getData()
    console.log(data)
    const findValue = data.find(p => p.id === id)
    setDefaultv(findValue)

  };

  const handelUpdate = (e) => {
    e.preventDefault()
    const userName = e.target.user.value || defaultv.user;
    const firstName = e.target.first.value || defaultv.first;
    const lastName = e.target.last.value || defaultv.last;
    const roletName = e.target.role.value || defaultv.role;
    const statusName = e.target.status.value || defaultv.status;
    const id = defaultv.id
    const data = { userName, firstName, lastName, roletName, id, statusName }
    editCard(data)
    onClose();

  }


  const table = useReactTable({
    data,
    columns,
    state: {

      globalFilter: filtering
    },
    onGlobalFilterChange: setfiltering,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (

    <div >

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}

      >
        <ModalOverlay />
        <form onSubmit={handelUpdate}>
          <ModalContent >

            <ModalCloseButton />
            <ModalBody pb={6} className="text-white">
              <FormControl >
                <FormLabel className={`cellWithStatus`}>User name</FormLabel>
                <Input className="text-white" name='user' ref={initialRef} placeholder='User name' defaultValue={defaultv.userName} />
              </FormControl>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input className="text-white" name='first' ref={initialRef} placeholder='First name' defaultValue={defaultv.firstName} />
              </FormControl>
              <FormControl>
                <FormLabel>Last name</FormLabel>
                <Input className="text-white" name='last' ref={initialRef} placeholder='Last name' defaultValue={defaultv.lastName} />
              </FormControl>
              <FormControl>
                <FormLabel >Role name</FormLabel>
                <Input className="text-white" name='role' ref={initialRef} placeholder='Role name' defaultValue={defaultv.roletName} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Status name</FormLabel>
                <select className='border border-cyan-300 text-white'
                  id="type"
                  name='status'
                  defaultValue={defaultv?.statusName}

                >
                  <option value="Active">Active</option>
                  <option value="Disabled">Disabled</option>
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

      <div >
        <div className="mb-7 ">
          {/* header text */}

          <div className="flex justify-between mt-5 ">
            <div className=""><Outlet></Outlet></div>
            <div className="flex gap-2 mb-2">
              <div className="mt-3 border flex text-[16px] gap-2 relative">
                <div className="relative">
                  <div className="absolute top-1/2 left-2 transform  text-[12px] -translate-y-1/2 text-gray-300">
                    <Search />
                  </div>
                  <input
                    className="bg-white border border-black text-[16px] rounded text-[16px] pl-10"
                    placeholder="Search For People"
                    type="text"
                    value={filtering}
                    onChange={(e) => debouncedSetFiltering(e.target.value)}
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
                <div className="grid grid-cols-6 text-[16px] " key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <div className='bg-gray-200 py-3 px-5 text-gray-700' key={header.id}>
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

                <div className={styles.tr} >
                  <div className="grid grid-cols-6 text-gray-800 text-[12px] font-normal" key={row.id}>

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

    </div>


  );
};

export default TanstaskTable;