"use client";

import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import TaskColumn from "./TaskColumn";
import AddTask from "./AddTask";

function Board() {
  const [newTaskColumn, setNewTaskColumn] = useState([{title: "teste"}]);
  console.log('newTaskColumn',newTaskColumn);
  
  const [inProgressTaskColumn, setInProgressTaskColumn] = useState([]);
  console.log('inProgressTaskColumn',inProgressTaskColumn);
  const [pausedTaskColumn, setPausedTaskColumn] = useState([]);
  console.log('pausedTaskColumn',pausedTaskColumn);
  const [concludedTaskColumn, setConcludedTaskColumn] = useState([]);
  console.log('concludedTaskColumn',concludedTaskColumn);

  const [items, setItems] = useState([]);

  const handleAddItem = (title: string) => {
    console.log(title);

    setItems([...items, title]);

    console.log(items);
  };

  const handleDragEnd = (event) => {
    console.log(event);
    const conteiner = event.over?.id;
    console.log(conteiner);
    
    const index = event.active.data.current.index ?? 0;
    const parent = event.active.data.current.parent ?? 'New';
    const title = event.active.data.current.title ?? '';

    if (conteiner === 'New') {
      setNewTaskColumn([...newTaskColumn, {title: title}]);
    } else if (conteiner === 'In Progress') {
      setInProgressTaskColumn([...inProgressTaskColumn, {title: title}]);
    } else if (conteiner === 'Paused') {
      setPausedTaskColumn([...pausedTaskColumn, {title: title}]);
    } else if (conteiner === 'Concluded') {
      setConcludedTaskColumn([...concludedTaskColumn, {title: title}]);
    }

    

  }

  



  return (
      <DndContext onDragEnd={handleDragEnd}>
        <AddTask addCard={handleAddItem} />
        <TaskColumn name="New" items={items} />
        <TaskColumn name="In Progress" items={inProgressTaskColumn} />
        <TaskColumn name="Paused" items={pausedTaskColumn} />
        <TaskColumn name="Concluded" items={concludedTaskColumn} />
      </DndContext>
  );  
}

export default Board;
