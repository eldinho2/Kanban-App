import {MdDeleteForever} from 'react-icons/md';

import {Task} from '@/app/Types';


interface DeleteColumnType {
  columnTitle: string,
  set: React.Dispatch<React.SetStateAction<{[key: string]: Task[];}>>,
}

const DeleteColumn = ({columnTitle, set}: DeleteColumnType) => {

  const handleDeleteColumn = () => {
    set((prev) => {
      const newBoard = {...prev};
      delete newBoard[columnTitle];
      return newBoard;
    })
  }
  
  return (
    <div className="">
      <button onClick={handleDeleteColumn} className="text-2xl flex items-center hover:text-[#46475e] text-[#6b6e8c]"><MdDeleteForever/></button>
    </div>
  )

}

export default DeleteColumn;