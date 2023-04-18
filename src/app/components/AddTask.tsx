import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

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


export default function AddTask({ addCard, items }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
  });

  const handleModal = () => {
    setIsOpen(!modalIsOpen);
  }

  const onFormChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  }

  const handleAddTask = (e) => {
    handleModal();
    e.preventDefault();
    addCard(newTask);
    setNewTask({
      title: '',
    });
  }

  useEffect(() => {
    const taskExists = items.find((item) => item.title === newTask.title);
    setError(taskExists);
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