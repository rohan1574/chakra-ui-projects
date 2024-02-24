import React, { useState } from 'react';
import Modal from './Modal';

const Tasktable = () => {
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <div className=' flex justify-center w-full'>
            <button className='border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-blue-500 hover:bg-blue-900 text-white' onClick={() => setModalOpen(true)}>
                User Name
            </button>
            <Modal  type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} ></Modal>
        </div>
    );
};

export default Tasktable;