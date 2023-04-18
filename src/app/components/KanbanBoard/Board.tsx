"use client";

import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { closestCenter } from '@dnd-kit/core';
import { verticalListSortingStrategy, SortableContext, arrayMove } from '@dnd-kit/sortable';
import { SortableItem } from "./SortableItem";
import TaskColumn from "./TaskColumn";
import AddTask from "../AddTask";

function Board() {
  const [inProgressTaskColumn, setInProgressTaskColumn] = useState(['testehrthhfthft3','testehrthfthh2','testehhfthrth1']);
  const [pausedTaskColumn, setPausedTaskColumn] = useState([]);
  const [concludedTaskColumn, setConcludedTaskColumn] = useState(['teste65','teste265','teste61']);

  const [items, setItems] = useState(['teste3','teste2','teste1']);

  const handleAddItem = (title: string) => {
    console.log(title);

    setItems([...items, title]);

    console.log(items);
  };

  const handleDragEnd = (event) => {
    console.log('EVENTO', event);
    const currentConteiner = event.over.data.current.sortable.containerId ?? undefined;
    const currentConteinerID = event.over.data.id;
    const originalConteiner = event.active.data.current.sortable.containerId;
    console.log('ORIGINALCONTAINER',originalConteiner);
    
    if (!currentConteiner) return;
    //const newContainer = event.over.id;
    //console.log('NEWCONTAINER',newContainer);
    
    console.log('CURRENTCONTAINER',currentConteiner);
    
    const index = event.active.data.current.index ?? 0;
    console.log('index',index);
    
    const parent = event.active.data.current.parent ?? 'New';
    console.log('parent',parent);

    const active = event.active.id;
    console.log('title',active);

    console.log('active', event.active.id);
    console.log('over', event.over.id  );
    
    if (currentConteiner === 'Sortable-0') {
      if (items.includes(active)) return;
      setItems([...items, active]);
    } else if (currentConteiner === 'Sortable-1') {
      if (pausedTaskColumn.includes(active)) return;
      setPausedTaskColumn([...pausedTaskColumn, active]);
    }
    else if (currentConteiner === 'Sortable-2') {
      if (inProgressTaskColumn.includes(active)) return;
      setInProgressTaskColumn([...inProgressTaskColumn, active]);
    }
    else if (currentConteiner === 'Sortable-3') {
      if (concludedTaskColumn.includes(active)) return;
      setConcludedTaskColumn([...concludedTaskColumn, active]);
    }

    if (originalConteiner === 'Sortable-0') {
      setItems(items.filter((item) => item !== active));
    }
    else if (originalConteiner === 'Sortable-1') {
      setPausedTaskColumn(pausedTaskColumn.filter((item) => item !== active));
    }
    else if (originalConteiner === 'Sortable-2') {
      setInProgressTaskColumn(inProgressTaskColumn.filter((item) => item !== active));
    }
    else if (originalConteiner === 'Sortable-3') {
      setConcludedTaskColumn(concludedTaskColumn.filter((item) => item !== active));
    }



}

  function handleDragEnd2(event) {
    handleDragEnd(event);
    const {active, over} = event;
    const currentConteiner = over.data.current.sortable.containerId;

    if(!currentConteiner) return;
    

    if (currentConteiner === 'Sortable-0') {
      setItems((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        console.log(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
      })
    } else if (currentConteiner === 'Sortable-1') {
      setPausedTaskColumn((pausedTaskColumn) => {
        const activeIndex = pausedTaskColumn.indexOf(active.id);
        const overIndex = pausedTaskColumn.indexOf(over.id);
        console.log(arrayMove(pausedTaskColumn, activeIndex, overIndex));
        return arrayMove(pausedTaskColumn, activeIndex, overIndex);
      });
    } else if (currentConteiner === 'Sortable-2') {
      setInProgressTaskColumn((inProgressTaskColumn) => {
        const activeIndex = inProgressTaskColumn.indexOf(active.id);
        const overIndex = inProgressTaskColumn.indexOf(over.id);
        console.log(arrayMove(inProgressTaskColumn, activeIndex, overIndex));
        return arrayMove(inProgressTaskColumn, activeIndex, overIndex);
      });
    }
    else if (currentConteiner === 'Sortable-3') {
      setConcludedTaskColumn((concludedTaskColumn) => {
        const activeIndex = concludedTaskColumn.indexOf(active.id);
        const overIndex = concludedTaskColumn.indexOf(over.id);
        console.log(arrayMove(concludedTaskColumn, activeIndex, overIndex));
        return arrayMove(concludedTaskColumn, activeIndex, overIndex);
      });
    }
  }

  return (
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd2}
        onDragStart={(event) => console.log('onDragStart', event)}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <TaskColumn name="New" items={items}/>
        </SortableContext>
        <SortableContext items={pausedTaskColumn} strategy={verticalListSortingStrategy}>
        <TaskColumn name="Paused" items={pausedTaskColumn}/>
        </SortableContext>
        <SortableContext items={inProgressTaskColumn} strategy={verticalListSortingStrategy}>
        <TaskColumn name="In Progress" items={inProgressTaskColumn}/>
        </SortableContext>
        <SortableContext items={concludedTaskColumn} strategy={verticalListSortingStrategy}>
        <TaskColumn name="Concluend" items={concludedTaskColumn}/>
        </SortableContext>
      </DndContext>
  );  
}

export default Board;
