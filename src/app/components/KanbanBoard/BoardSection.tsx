
import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task } from '@/app/Types';

import TaskItem from './TaskItem';
import AddTask from "./AddTask";
import DeleteColumn from './DeleteColumn';


interface BoardSectionProps {
  id: string;
  title: string;
  tasks: Task[];
  set: React.Dispatch<React.SetStateAction<{[key: string]: Task[];}>>;
  board: {[key: string]: Task[];};
}

function BoardSection({id, title, tasks, set, board}: BoardSectionProps) {
  const { setNodeRef, over } = useDroppable({
    id,
  })
  
  const styleBoardTitleDots = (title : string) => {

    const titles = ['todo', 'in-progress', 'completed'];

    if (title === 'todo') {
      return 'bg-[#43c3e8]';
    }
    if (title === 'in-progress') {
      return `bg-[#9b1418]`;
    }
    if (title === 'completed') {
      return 'bg-green-300';
    }
    if (!titles.includes(title)) {
      return `bg-[#7e8190]`;
    }
  }
  

  const isOverContainer = over?.data?.current?.sortable.containerId === id;

  return (
    <div className='flex flex-col m-2 justify-center items-center'>
      <div className="flex items-center justify-center gap-2 text-lg font-semibold">
        <div className={`rounded-full ${styleBoardTitleDots(title)} w-4 h-4`}></div>
        <h2 className='text-[#7e8190] uppercase'>{title}</h2>
        <span className='text-[#7e8190]'>({tasks.length})</span>
        <div className='flex gap-3 items-center'>
          <AddTask columnTitle={title} set={set} />
          <DeleteColumn columnTitle={title} set={set} />
        </div>
      </div>
      <div className='flex flex-col p-4' ref={setNodeRef}>
        <SortableContext id={id} items={tasks} strategy={verticalListSortingStrategy}  >
          {tasks.map((task) => (
            <div className={isOverContainer ? "bg-[#35353e] border-dashed border-2 border-[#4b4b54]" : undefined} key={task.id}>
                <TaskItem set={set} id={task.id} columnTitle={title} item={task} board={board} />
            </div>
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

export default BoardSection;