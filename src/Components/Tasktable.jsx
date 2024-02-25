
import React from 'react';
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
} from '@chakra-ui/react'
import { addData } from '../../public/localStorage';

const Tasktable = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

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

        const data = { userName, firstName, lastName, roletName, statusName, id }
        console.log(data)
        addData(data)
        onClose();
    }

    return (
        <div>
            <div onClick={onOpen} className='text-white bg-blue-500 rounded-lg p-2'>

                New User
            </div>


            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <form onSubmit={handleSubmit} >
                    <ModalContent >
                        <ModalHeader>Create your account</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6} >
                            <FormControl >
                                <FormLabel className={`cellWithStatus`}>First name</FormLabel>
                                <Input name='user' ref={initialRef} placeholder='First name' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>First name</FormLabel>
                                <Input name='first' ref={initialRef} placeholder='First name' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>First name</FormLabel>
                                <Input name='last' ref={initialRef} placeholder='First name' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>First name</FormLabel>
                                <Input name='role' ref={initialRef} placeholder='First name' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Last name</FormLabel>
                                <select className='border border-cyan-300 '
                                    id="type"
                                    name='status'

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
        </div>
    );
};

export default Tasktable;