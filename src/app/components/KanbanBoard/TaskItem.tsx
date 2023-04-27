import { Task } from "@/app/Types";
import Image from "next/image";

interface TaskItemProps {
  item: Task;
}

function TaskItem({item}: TaskItemProps) {
  return (
      <div className="p-3 m-4 rounded bg-[#2c2c38] flex flex-col">
        <h1 className="text-[#f0f0f7] font-semibold">{item.title ? item.title : 'a'}</h1>
        <i className="flex justify-end">
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
  )
}

export default TaskItem;