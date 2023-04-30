import {MdDeleteForever} from 'react-icons/md';

import {Task} from '@/app/Types';


interface DeleteColumnType {
  id: string,
  set: React.Dispatch<React.SetStateAction<{[key: string]: Task[];}>>,
  board?: {[key: string]: Task[];},
  columnTitle: string,
}

const DeleteTask = ({id, set, board, columnTitle}: DeleteColumnType) => {

  const handlDeleteTask = () => {
    console.log(id);
    console.log(board);
    console.log(set);
    console.log(columnTitle);
    set((prev) => {
      const newBoard = {...prev};
      newBoard[columnTitle] = newBoard[columnTitle].filter((task) => task.id !== id);
      return newBoard;
    })
  }
  
  return (
    <div className="">
      <button onClick={handlDeleteTask} className="text-2xl hover:text-red-500 text-red-900"><MdDeleteForever/></button>
    </div>
  )

}

export default DeleteTask;