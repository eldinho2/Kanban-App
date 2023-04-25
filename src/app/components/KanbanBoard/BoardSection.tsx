
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task } from '@/app/Types';

import SortableTaskItem from './SortableTaskItem';
import TaskItem from './TaskItem';


interface BoardSectionProps {
  id: string;
  title: string;
  tasks: Task[];
}

function BoardSection({id, title, tasks}: BoardSectionProps) {
  const { setNodeRef } = useDroppable({
    id,
  })

  return (
    <div>
      <div>
        <h2>{title}</h2>
      </div>
      <div className='flex flex-col bg-gray-700 p-4 w-[400px]' ref={setNodeRef}>
        <SortableContext id={id} items={tasks} strategy={verticalListSortingStrategy}  >
          {tasks.map((task) => (
            <div key={task.id}>
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