import { Task } from "@/app/Types"

interface TaskItemProps {
  item: Task;
}

function TaskItem({item}: TaskItemProps) {
  return (
    <div>
      <div className="p-4 m-4 rounded bg-slate-300">
        {item.title}
      </div>
    </div>
  )
}

export default TaskItem;