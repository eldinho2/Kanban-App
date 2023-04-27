import { Task } from "@/app/Types";
import Image from "next/image";

interface TaskItemProps {
  item: Task;
}

function TaskItem({item}: TaskItemProps) {
  return (
      <div className="p-3 m-4 rounded bg-[#2c2c38] flex flex-col">
        <h1 className="text-[#f0f0f7]">{item.title}</h1>
        <i className="flex justify-end">
          <Image
            src={item.img}
            alt={item.title}
            width={35}
            height={35}
            className="rounded-full"
            quality={100}
          />
        </i>
      </div>
  )
}

export default TaskItem;