import React, { useEffect, useState } from 'react';
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
      isInBoard: columnName,
    });
    setError(true)
  }
    
  
  return (
    <div>
    <button onClick={handleModal} className='w-3 h-3'>+</button>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className='flex flex-col'>
        <h1 className='flex justify-center m-3 uppercase text-sm font-medium'>Add Task</h1>
        <form className='flex flex-col'>
          <input className='text-zinc-200 bg-slate-400' type="text" name="title" onChange={onFormChange} value={newTask.title} />
          <div className='flex justify-evenly mt-3'>
            <button className='bg-green-400 hover:bg-green-200 disabled:bg-slate-100' disabled={error} onClick={handleAddTask}>Add</button>
            <button className='bg-red-400 hover:bg-red-200' onClick={handleModal}>Close</button>
          </div>
        </form>
      </div>
    </Modal>
  </div>
  )
}