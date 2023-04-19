import { Task } from "@/app/Types"

interface TaskItemProps {
  item: Task;
}

function TaskItem({item}: TaskItemProps) {
  return (
    <div>
      <div>
        {item.title}
      </div>
    </div>
  )
}

export default TaskItem;