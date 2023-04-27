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
  },
};


export default function AddTask({ set, columnTitle }: AddTaskType) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
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
      isInBoard: 'todo',
    });
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
      <div>
        <h1>Add Task</h1>
        <form>
          <input type="text" name="title" onChange={onFormChange} value={newTask.title} />
          {error && <p>Task already exists</p>}
          <button disabled={error} onClick={handleAddTask}>Add</button>
          <button onClick={handleModal}>Close</button>
        </form>
      </div>
    </Modal>
  </div>
  )
}