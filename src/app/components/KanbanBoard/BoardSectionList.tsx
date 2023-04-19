'use client'

import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";

import BoardSection from "./BoardSection";



function BoardSectionList() {
  const [tasks, setTasks] = useState([
    {
    id: uuidv4(),
    title: 'Task 1',
    isInBoard: 'todo',
    },
    {
    id: uuidv4(),
    title: 'Task 2',
    isInBoard: 'todo',
    },
    {
    id: uuidv4(),
    title: 'Task 3',
    isInBoard: 'in-progress',
    },
    {
    id: uuidv4(),
    title: 'Task 4',
    isInBoard: 'completed',
    },
  ]);



  return (
    <div>
      <DndContext>
        <div className="flex m-10 gap-6">
          {Object.keys(tasks).map((taskKey) => (
            console.log(taskKey),
            <div key={taskKey}>
              <BoardSection id={taskKey} title={taskKey} tasks={tasks} />
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  )
}

export default BoardSectionList;