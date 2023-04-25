import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { v4 as uuidv4 } from "uuid";


import {Task} from '@/app/Types';

import { FormEvent, ChangeEvent  } from 'react';

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


export default function AddTask({ set, items }: { set: React.Dispatch<React.SetStateAction<Task[]>>, items: Task[] }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [newTask, setNewTask] = useState({
    id: uuidv4(),
    title: '',
    isInBoard: 'todo',
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
    set([...items, newTask]);
    setNewTask({
      id: uuidv4(),
      title: '',
      isInBoard: 'todo',
    });
  }

  useEffect(() => {
    const taskExists = items.find((item) => item.title === newTask.title);
    setError(!!taskExists);
  }, [items, newTask]);
  
  return (
    <div>
    <div>Adiconar task</div>
    <button onClick={handleModal}>Add</button>
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