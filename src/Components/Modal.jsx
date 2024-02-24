import React from 'react';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';
import { addData } from '../../public/localStorage';
// import { CopyX } from 'lucide';

const dropIn = {
    hidden: {
        opacity: 0,
        transform: 'scale(0.9)',
    },
    visible: {
        transform: 'scale(1)',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        transform: 'scale(0.9)',
        opacity: 0,
    },
};

const Modal = ({  modalOpen, setModalOpen }) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        const userName = e.target.user.value
        const firstName = e.target.first.value
        const lastName = e.target.last.value
        const roletName = e.target.role.value
        const statusName = e.target.status.value
        const id = Math.floor(Math.random() * 100)
        
        const data ={userName, firstName, lastName, roletName, statusName,id}
        console.log(data)
        addData(data)

    }
    return (
        <div className='z-10'>
            {modalOpen && (
                <div className='bg-gray-200 '>
                    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50'>
                        <div className='bg-white rounded shadow-lg w-1/3'>
                            <div className='flex justify-center'>
                                <form onSubmit={handleSubmit} >
                                    <h1 >
                                         TODO
                                    </h1>
                                    <div >
                                        <div className=''>USER NAME</div>
                                        <label htmlFor="title">

                                            <input className='border bg-white border-cyan-300 '
                                                type="text"
                                                id="title"
                                                name='user'

                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <div>FIRST NAME</div>
                                        <label htmlFor="title">

                                            <input className='border bg-white border-cyan-300 '
                                                type="text"
                                                id="title"
                                                name='first'

                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <div>LAST NAME</div>
                                        <label htmlFor="title">

                                            <input className='border bg-white border-cyan-300 '
                                                type="text"
                                                id="title"
                                                name='last'

                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <div>ROLE NAME</div>
                                        <label htmlFor="title">

                                            <input className='border bg-white border-cyan-300 '
                                                type="text"
                                                id="title"
                                                name='role'

                                            />
                                        </label>
                                    </div>
                                    <div> Status NAME</div>
                                    <label htmlFor="type">

                                        <select className='border bg-white border-cyan-300 '
                                            id="type"
                                            name='status'

                                        >
                                            <option value="incomplete">Incomplete</option>
                                            <option value="complete">Completed</option>
                                        </select>
                                    </label>

                                    <div>
                                        <button type='submit' className='border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-blue-500 hover:bg-blue-900 text-white' >
                                            Add
                                        </button>
                                        <button className='border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-blue-500 hover:bg-blue-900 text-white' onClick={() => setModalOpen(false)}>
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;