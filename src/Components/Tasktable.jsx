
import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
    Alert,
    AlertIcon,
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { addData } from '../../public/localStorage';
import { Select } from '@chakra-ui/react'

const Tasktable = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [roletName, setRoletName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const toast = useToast();
   
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)


    const handleSubmit = (e) => {
        e.preventDefault()
        const userName = e.target.user.value
        const firstName = e.target.first.value
        const lastName = e.target.last.value
        const roletName = e.target.role.value
        const statusName = e.target.status.value
        const id = Math.floor(Math.random() * 100)

        if (userName.length < 2) {
           
            setErrorMessage("All User Name must contain  two characters.");
            return;
        }
        if (firstName.length < 2) {
            
            setErrorMessage("All first Name must contain  two characters.");
            return;
        }
        if (lastName.length < 2) {
            
            setErrorMessage("All last Name must contain  two characters.");
            return;
        }
        if (roletName.length < 2) {
            
            setErrorMessage("All Role Name must contain  two characters.");
            return;
        }


        const data = { userName, firstName, lastName, roletName, statusName, id }
        toast({
            title: "User Created",
            description: "User has been created successfully.",
            status: "success",
            duration: 1000,
            isClosable: true,
            position: "top",
        });
        addData(data)
        onClose();
    }
    const handleOpenModal = () => {
        if (userName.length < 2) {
            setUserName('');


        }
        if (firstName.length < 2) {
            setFirstName('');
        }
        if (lastName.length < 2) {
            setLastName('');
        }
        if (roletName.length < 2) {
            setRoletName('');
        }
        setErrorMessage('');

        onOpen();
    };

    return (
        <div >
            
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
                <form onSubmit={handleSubmit} >
                    <ModalContent className='bg-white' >

                        <ModalCloseButton onClick={onClose} className='text-red-500'/>
                        <ModalBody pb={6} className="text-white ">

                            <FormControl className='border-solid border-5 border-indigo-600' >
                                <FormLabel >User name</FormLabel>
                                <Input name='user'  ref={initialRef} placeholder='User name' required />

                            </FormControl>
                            <FormControl className='border-solid border-5 border-indigo-600 mt-3' >
                                <FormLabel>First name</FormLabel>
                                <Input name='first'    placeholder='First name' required />

                            </FormControl>
                            <FormControl className='border-solid border-5 border-indigo-600 mt-3'>
                                <FormLabel>Last name</FormLabel>
                                <Input name='last'  placeholder='Last name' required />

                            </FormControl>
                            <FormControl className='border-solid border-5 border-indigo-600 mt-3'>
                                <FormLabel>Role name</FormLabel>
                                <Input name='role'  placeholder='Role name' required />
                               
                            </FormControl >
                            {errorMessage && (
                                    <Alert status='error' mt={4}>
                                        <AlertIcon />
                                        {errorMessage}
                                    </Alert>
                                )}

                           <div className='border-solid border-5 border-indigo-600 '>
                           <FormControl  mt={4}>
                                <FormLabel >status name</FormLabel>
                                <Select className='bg-white mb-2' placeholder='Select option' id="type"
                                    name='status' required
                                    >
                                    <option value="Active">Active</option>
                                    <option value="Disabled">Disabled</option>
                                </Select>
                            </FormControl>
                           </div>

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
    );
};

export default Tasktable;