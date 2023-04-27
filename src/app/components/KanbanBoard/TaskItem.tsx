import { Task } from "@/app/Types"

interface TaskItemProps {
  item: Task;
}

function TaskItem({item}: TaskItemProps) {
  return (
      <div className="p-4 m-4 rounded bg-[#2c2c38]">
        <h1 className="text-[#f0f0f7]">{item.title}</h1>
      </div>
  )
}

export default TaskItem;