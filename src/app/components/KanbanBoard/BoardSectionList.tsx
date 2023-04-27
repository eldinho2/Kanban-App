'use client'

import { useState, useEffect } from "react";
import {
   DndContext,
   DragStartEvent,
   DragOverEvent,
   DragEndEvent,
   useSensors,
   useSensor,
   PointerSensor,
   KeyboardSensor,
   TouchSensor,
   closestCorners,
   DragOverlay,
   DropAnimation,
   defaultDropAnimation,
   defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import TaskItem from './TaskItem';
import BoardSection from "./BoardSection";
import {initializeBoard, findBoardSectionContainer}  from './utils/board';

function BoardSectionList() {
  const [boardSectionsNoTreatment, setboardSectionsNoTreatment] = useState([
    {
    id: uuidv4(),
    title: 'Construir UI da pagina de Gerenciamento de Tarefas',
    img: `https://randomuser.me/api/portraits/men/61.jpg`,
    isInBoard: 'todo',
    },
    {
    id: uuidv4(),
    title: 'Adicionar funcionalidade de adicionar novo Board',
    img: `https://randomuser.me/api/portraits/women/26.jpg`,
    isInBoard: 'todo',
    },
    {
    id: uuidv4(),
    title: 'Desenvolvendo input de email e senha',
    img: `https://randomuser.me/api/portraits/men/58.jpg`,
    isInBoard: 'in-progress',
    },
    {
    id: uuidv4(),
    title: 'Escrever testes para a barra de pesquisa',
    img: `https://randomuser.me/api/portraits/men/65.jpg`,
    isInBoard: 'completed',
    },
  ]);

  const initialBoard = initializeBoard(boardSectionsNoTreatment);

  const [board, setBoard] = useState(initialBoard);
  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({active}: DragStartEvent) => {
    setActiveTaskId(active.id as string);   
    document.body.style.setProperty('cursor', 'grabbing');
  }
  
  const handleDragOver = ({active, over}:DragOverEvent) => {    
    const activeContainer = findBoardSectionContainer(board, active.id as string);

    const overContainer = findBoardSectionContainer(board, over?.id as string);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }
  
    setBoard((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];      
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);
  
      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(
            (item) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          board[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length
          ),
        ],
      };
    });
  }

  const hanldeDragEnd = ({active, over}: DragEndEvent) => {
    const activeContainer = findBoardSectionContainer(board, active.id as string);

    const overContainer = findBoardSectionContainer(board, over?.id as string);

    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      return;
    }
    
    const activeIndex = board[activeContainer].findIndex((task) => task.id === active.id);    
    const overIndex = board[overContainer].findIndex((task) => task.id === over?.id);

    if (activeIndex !== overIndex) {
      setBoard((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(
          boardSection[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveTaskId(null);
    document.body.style.setProperty('cursor', 'default');
  }

  const getTaskById = (board: any, id: string) => {
    const boardSections = Object.keys(board);
    for (let i = 0; i < boardSections.length; i++) {
      const boardSection = boardSections[i];
      const task = board[boardSection].find((task: any) => task.id === id);
      if (task) {
        return task;
      }
    }
    return null;
  }


  const task = activeTaskId ? getTaskById(board, activeTaskId) : null;

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  return (
    <div className="bg-[#21212d] w-full flex">
      <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={hanldeDragEnd}
      >
        <div className="flex m-10 gap-6 h-[600px] overflow-auto">
          {Object.keys(board).map((taskKey) => (
            <div className="w-[300px]" key={taskKey}>
              <BoardSection set={setBoard} id={taskKey} title={taskKey} tasks={board[taskKey]} />
            </div>
          ))}
          <DragOverlay
            dropAnimation={dropAnimation}
            >
            {activeTaskId ? <TaskItem item={task} /> : null}
          </DragOverlay>
        </div>
        <div className="cursor-pointer m-10 w-[200px] h-[600px] border-b-white border-2 border-dashed bg-[#21212d] flex items-center">
          <h1 className="text-white text-2xl font-bold text-center">+ Create New Column</h1>
        </div>
      </DndContext>
    </div>
  )
}

export default BoardSectionList;