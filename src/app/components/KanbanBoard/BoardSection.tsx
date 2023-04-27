
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task } from '@/app/Types';

import SortableTaskItem from './SortableTaskItem';
import TaskItem from './TaskItem';
import { useEffect } from 'react';


interface BoardSectionProps {
  id: string;
  title: string;
  tasks: Task[];
}

function BoardSection({id, title, tasks}: BoardSectionProps) {
  const { setNodeRef, isOver, over } = useDroppable({
    id,
  })

  console.log(title);

  const styleBoardTitleDots = (title : string) => {
    if (title === 'todo') {
      return 'bg-red-300';
    }
    if (title === 'in-progress') {
      return 'bg-yellow-300';
    }
    if (title === 'completed') {
      return 'bg-green-300';
    }
  }
  

  const isOverContainer = over?.data?.current?.sortable.containerId === id;
  return (
    <div className='flex flex-col justify-center'>
      <div className="flex items-center justify-center gap-1 text-lg font-semibold">
        <div className={`rounded-full ${title === 'todo' ? "bg-red-300" : "bg-slate-500"} w-2 h-2`}></div>
        <h2 className='text-[#7e8190] uppercase'>{title}</h2>
        <span className='text-[#7e8190]'>({tasks.length})</span>
      </div>
      <div className='flex flex-col p-4' ref={setNodeRef}>
        <SortableContext id={id} items={tasks} strategy={verticalListSortingStrategy}  >
          {tasks.map((task) => (
            <div className={isOverContainer ? "bg-[#35353e] border-dashed border-2 border-[#4b4b54]" : undefined} key={task.id}>
              <SortableTaskItem id={task.id}>
                <TaskItem item={task} />
              </SortableTaskItem>
            </div>
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

export default BoardSection;