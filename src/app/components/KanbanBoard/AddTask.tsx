import React, { useState,  } from 'react';
import Modal from 'react-modal';
import { v4 as uuidv4 } from "uuid";


import {Task} from '@/app/Types';

import { FormEvent, ChangeEvent  } from 'react';

interface AddTaskType {
  set: React.Dispatch<React.SetStateAction<{[key: string]: Task[];}>>,
  columnTitle: string,
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#21212d',
    color: "#e8e9eb",
    border: ""
  },
  overlay: {
    backgroundColor: 'rgba(98, 98, 105, 0.75)',
  }
};


export default function AddTask({ set, columnTitle }: AddTaskType) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(true);
  const [columnName, setColumnName] = useState(columnTitle)
  const [newTask, setNewTask] = useState({
    id: uuidv4(),
    title: '',
    img: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 90)}.jpg`,
    isInBoard: columnName,
  });

  const handleModal = () => {
    setIsOpen(!modalIsOpen);
  }

  const onFormChange = (event:ChangeEvent<HTMLInputElement>) => {
    
    const { target } = event;
    
    setNewTask({
      ...newTask,
      [target.name]: target.value,
    });

    if (target.value.length > 0) {
      setError(false)
    }
  }

  const handleAddTask = (e:FormEvent) => {
    handleModal();
    e.preventDefault();
    set((boardSection) => ({
      ...boardSection,
      [newTask.isInBoard]: [
        ...boardSection[newTask.isInBoard],
        newTask,
      ],
    }));
    setNewTask({
      id: uuidv4(),
      title: '',
      img: `https://randomuser.me/api/portraits/men/7.jpg`,
      isInBoard: columnName,
    });
    setError(true)
  }
  
  return (
    <div>
    <button onClick={handleModal} className='w-3 h-3 text-[#6461b7]'>+</button>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
      shouldFocusAfterRender={false}
    >
      <div className='flex flex-col'>
        <form className='flex flex-col'>
          <h1 className='flex justify-center m-3 uppercase text-sm font-medium'>Add Task</h1>
          <input autoFocus={true} className='placeholder:italic placeholder:text-slate-400 block bg-[#21212d] w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm p-2' placeholder="Insira uma nova tarefa" type="text" name="title" onChange={onFormChange} value={newTask.title} />
          <div className='flex justify-evenly mt-3'>
            <button className='bg-green-400 hover:bg-green-200 disabled:bg-slate-100 rounded-lg w-20 h-7' disabled={error} onClick={handleAddTask}>Add</button>
            <button className='bg-red-400 hover:bg-red-200 rounded-lg w-14 h-7' onClick={handleModal}>Close</button>
          </div>
        </form>
      </div>
    </Modal>
  </div>
  )
}