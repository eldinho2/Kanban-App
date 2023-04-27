import React, { useState } from "react";
import Modal from "react-modal";
import { FormEvent, ChangeEvent } from "react";

import { Task } from "@/app/Types";

interface AddColumnType {
  setBoard: React.Dispatch<React.SetStateAction<{ [key: string]: Task[] }>>;
  acState: { [key: string]: Task[] };
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#21212d",
    color: "#e8e9eb",
    border: "",
  },
  overlay: {
    backgroundColor: "rgba(98, 98, 105, 0.75)",
  },
};

const AddColumn = ({ setBoard, acState }:AddColumnType) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(true);
  const [columnName, setColumnName] = useState('');

  const handleModal = () => {
    setIsOpen(!modalIsOpen);
  }

  const addNewColumn = (e:FormEvent) => {
    handleModal();
    e.preventDefault();
    if (columnName.length === 0) {
      setError(true);
      return;
    }
    console.log(acState);
    setBoard({
      ...acState,
      [columnName]: [],
    });
    setColumnName('');
    setError(true);
  };

  const onFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    if (target.value.length > 0) {
      setError(false);
    }
    if (Object.keys(acState).includes(target.value)) {
      setError(true);
    }

    setColumnName(target.value);
  }

  return (
    <div>
      <div
        onClick={handleModal}
        className="cursor-pointer m-10 w-[200px] h-[600px] border-b-white border-2 border-dashed bg-[#21212d] flex items-center"
      >
        <h1 className="text-white text-2xl font-bold text-center">
          + Create New Column
        </h1>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        shouldFocusAfterRender={false}
      >
        <div className="flex flex-col">
          <form className="flex flex-col">
            <h1 className="flex justify-center m-3 uppercase text-sm font-medium">
              Adicionar nova Coluna
            </h1>
            <input
              autoFocus={true}
              className="placeholder:italic placeholder:text-slate-400 block bg-[#21212d] w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm p-2"
              placeholder="Adicionar nova Coluna"
              type="text"
              name="title"
              onChange={onFormChange}
              value={columnName}
            />
            <div className="flex justify-evenly mt-3">
              <button
                className="bg-green-400 hover:bg-green-200 disabled:bg-slate-100 rounded-lg w-20 h-7"
                disabled={error}
                onClick={addNewColumn}
              >
                Add
              </button>
              <button
                className="bg-red-400 hover:bg-red-200 rounded-lg w-14 h-7"
                onClick={handleModal}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddColumn;
