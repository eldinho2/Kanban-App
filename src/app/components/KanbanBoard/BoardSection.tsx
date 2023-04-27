
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task } from '@/app/Types';

import SortableTaskItem from './SortableTaskItem';
import TaskItem from './TaskItem';
import AddTask from "./AddTask";


interface BoardSectionProps {
  id: string;
  title: string;
  tasks: Task[];
  set: React.Dispatch<React.SetStateAction<{[key: string]: Task[];}>>;
}

function BoardSection({id, title, tasks, set}: BoardSectionProps) {
  const { setNodeRef, over } = useDroppable({
    id,
  })

  const styleBoardTitleDots = (title : string) => {
    if (title === 'todo') {
      return 'bg-[#43c3e8]';
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
      <div className="flex items-center justify-center gap-2 text-lg font-semibold">
        <div className={`rounded-full ${styleBoardTitleDots(title)} w-4 h-4`}></div>
        <h2 className='text-[#7e8190] uppercase'>{title}</h2>
        <span className='text-[#7e8190]'>({tasks.length})</span>
        <AddTask columnTitle={title} set={set} />
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