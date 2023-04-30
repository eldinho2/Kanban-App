import Image from "next/image";
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import DragHandle from './DragHandle';
import DeleteTask from "./DeleteTask";

import {Task} from '@/app/Types';

interface TaskItemProps {
  item: Task;
  id: string;
  set: React.Dispatch<React.SetStateAction<{[key: string]: Task[];}>>,
  board?: {[key: string]: Task[];},
  columnTitle: string,
}

function TaskItem({item, id, set, board, columnTitle}: TaskItemProps) {
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    cursor: 'default',
  }


  return (
      <div style={style} {...attributes} ref={setNodeRef}  className="p-3 m-4 w-[250px] rounded bg-[#2c2c38] flex">
        <div className="flex flex-col flex-1">
        <p className="text-[#f0f0f7] font-semibold break-words">{item.title ? item.title : 'a'}</p>
        <i>
          <Image
            src={item.img ? item.img : '/images/placeholder.png'}
            alt={item.title ? item.title : 'a'}
            width={35}
            height={35}
            className="rounded-full m-2"
            quality={100}
          />
        </i>
        </div>
        <div className="flex justify-center items-center gap-2">
        <DeleteTask id={id} set={set} columnTitle={columnTitle} board={board} />
        <DragHandle {...listeners}/>
        </div>
      </div>
  )
}

export default TaskItem;