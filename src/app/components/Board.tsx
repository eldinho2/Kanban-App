"use client";

import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import TaskColumn from "./TaskColumn";
import AddTask from "./AddTask";

function Board() {
  const [inProgressTaskColumn, setInProgressTaskColumn] = useState([]);
  console.log('inProgressTaskColumn',inProgressTaskColumn);
  const [pausedTaskColumn, setPausedTaskColumn] = useState([]);
  console.log('pausedTaskColumn',pausedTaskColumn);
  const [concludedTaskColumn, setConcludedTaskColumn] = useState([]);
  console.log('concludedTaskColumn',concludedTaskColumn);

  const [items, setItems] = useState([{ title: "teste1"}]);

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
    console.log('index',index);
    
    const parent = event.active.data.current.parent ?? 'New';
    console.log('parent',parent);

    const title = event.active.data.current.title ?? '';
    console.log('title',title);

    if (conteiner === 'New') {
      setItems([...items, {title: title}]);
    } else if (conteiner === 'In Progress') {
      setInProgressTaskColumn([...inProgressTaskColumn, {title: title}]);
    } else if (conteiner === 'Paused') {
      setPausedTaskColumn([...pausedTaskColumn, {title: title}]);
    } else if (conteiner === 'Concluded') {
      setConcludedTaskColumn([...concludedTaskColumn, {title: title}]);
    }

    if (parent === 'In Progress') {
      inProgressTaskColumn.splice(index, 1);
      setInProgressTaskColumn([...inProgressTaskColumn]);
    }
    if (parent === 'Paused') {
      pausedTaskColumn.splice(index, 1);
      setPausedTaskColumn([...pausedTaskColumn]);
    }
    if (parent === 'Concluded') {
      concludedTaskColumn.splice(index, 1);
      setConcludedTaskColumn([...concludedTaskColumn]);
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
