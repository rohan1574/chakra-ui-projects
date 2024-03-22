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
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Tasktable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [errorMessage, setErrorMessage] = useState('');
  const toast = useToast();
  const [inputData, setInputData] = useState({
    name: '',
    username:'',
    email:''
  })

   
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://jsonplaceholder.typicode.com/users', inputData)
    .then(res=>{
      alert("data post")
     
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  const handleOpenModal = () => {
    onOpen();
  }
  return (
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
                  <Input name='name' ref={initialRef} onChange={handleChange} value={inputData.name} placeholder='User name' required />
                </FormControl>
                <FormControl className='border-solid border-5 border-indigo-600 mt-3'>
                  <FormLabel>First name</FormLabel>
                  <Input name='username' placeholder='First name' onChange={handleChange} value={inputData.username} required />
                </FormControl>
                <FormControl className='border-solid border-5 border-indigo-600 mt-3'>
                  <FormLabel>Last name</FormLabel>
                  <Input name='email' placeholder='Last name' onChange={handleChange} value={inputData.email} required />
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
  );
};

export default Tasktable;
